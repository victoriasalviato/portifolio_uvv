
import $ from "jquery";

export class EncryptionService {
  // Função estática para criptografar dados
  static async encryptData(data: string, key: string): Promise<string> {
    try {
      const encoder = new TextEncoder();
      const keyMaterial = await crypto.subtle.importKey(
        "raw",
        encoder.encode(key),
        "PBKDF2",
        false,
        ["deriveBits", "deriveKey"]
      );

      const salt = crypto.getRandomValues(new Uint8Array(16));

      const cryptoKey = await crypto.subtle.deriveKey(
        {
          name: "PBKDF2",
          salt,
          iterations: 100000,
          hash: "SHA-256",
        },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt"]
      );

      const iv = crypto.getRandomValues(new Uint8Array(12));

      const encryptedData = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        cryptoKey,
        encoder.encode(data)
      );

      const result = new Uint8Array(
        salt.length + iv.length + encryptedData.byteLength
      );
      result.set(salt, 0);
      result.set(iv, salt.length);
      result.set(new Uint8Array(encryptedData), salt.length + iv.length);

      return btoa(String.fromCharCode(...result)); // Isso converte para base64
    } catch (error) {
      console.error("Erro ao criptografar dados:", error);
      throw error;
    }
  }

  // Função estática para descriptografar dados
  static async decryptData(encryptedData: string, key: string): Promise<string> {
    try {
      // Decodificar os dados base64 para Uint8Array
      const data = new Uint8Array(
        atob(encryptedData).split("").map((c) => c.charCodeAt(0))
      );
  
      // Extrair salt e IV dos dados criptografados
      const salt = data.slice(0, 16);
      const iv = data.slice(16, 28);
      const encrypted = data.slice(28);
  
      // Importar chave novamente com base na senha
      const encoder = new TextEncoder();
      const keyMaterial = await crypto.subtle.importKey(
        "raw",
        encoder.encode(key),
        { name: "PBKDF2" },
        false,
        ["deriveBits", "deriveKey"]
      );
  
      // Derivar a chave a partir do keyMaterial e salt
      const cryptoKey = await crypto.subtle.deriveKey(
        {
          name: "PBKDF2",
          salt: salt,
          iterations: 100000,
          hash: "SHA-256",
        },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        false,
        ["decrypt"]
      );
  
      // Descriptografar os dados
      const decrypted = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv: iv },
        cryptoKey,
        encrypted
      );
  
      // Retornar o texto descriptografado
      return new TextDecoder().decode(decrypted);
    } catch (error) {
      console.error("Erro ao descriptografar dados:", error);
      throw error;
    }
  }  
}