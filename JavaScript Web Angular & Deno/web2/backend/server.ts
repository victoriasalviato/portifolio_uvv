// backend/server.ts
import { Application, Router, Context, Next } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { create, verify, getNumericDate } from "https://deno.land/x/djwt@v3.0.1/mod.ts";
import { Pool } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import { EncryptionService } from './encryption.service.ts'; // Importando o EncryptionService


const app = new Application();
const router = new Router();

// Create a connection pool
const pool = new Pool({
  user: "postgres",
  database: "web2",
  hostname: "localhost",
  password: "0000",
  port: 5432,
}, 20); // max connections

const JWT_SECRET = Deno.env.get("JWT_SECRET") || "your-secret-key";  // Chave para criptografia

// Function to generate CryptoKey for JWT signing
async function generateKey(secret: string): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    true,
    ["sign", "verify"]
  );
  return cryptoKey;
}

// JWT verification middleware
const jwtMiddleware = async (ctx: Context, next: Next) => {
  const authHeader = ctx.request.headers.get("Authorization");

  if (!authHeader) {
    ctx.response.status = 401;
    ctx.response.body = { message: "Authorization header not provided" };
    return;
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    ctx.response.status = 401;
    ctx.response.body = { message: "Invalid authorization format. Use: Bearer <token>" };
    return;
  }

  const token = parts[1];

  try {
    // Importando a chave secreta como CryptoKey
    const secretKey = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(JWT_SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    // Verificando o token com a chave secreta importada
    const payload = await verify(token, secretKey);
    ctx.state.user = payload; // Armazenando o payload no contexto

    await next(); // Passa para o próximo middleware/rota
  } catch (err) {
    ctx.response.status = 401;
    ctx.response.body = {
      message: "Invalid token",
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
};

// Rota protegida
router.get("/api/jogos", jwtMiddleware, async (ctx) => {
  const connection = await pool.connect();
  try {
    const result = await connection.queryObject`SELECT * FROM jogos`;
    ctx.response.body = result.rows;
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { message: "Erro ao buscar jogos" };
  } finally {
    connection.release();
  }
});

// Endpoint de login
router.post("/login", async (ctx) => {
  const { username, password } = await ctx.request.body().value;

  if (username === "user" && password === "password") {
    const payload = { userId: 1 , exp: getNumericDate(60 * 60)};
    const key = await generateKey(JWT_SECRET);
    const jwt = await create({ alg: "HS256", typ: "JWT" }, payload, key);
    ctx.response.body = { token: jwt };
  } else {
    ctx.response.status = 401;
    ctx.response.body = { message: "Usuário ou senha incorretos" };
  }
  
});

// Rota para criptografar dados
router.post("/encrypt", async (ctx) => {
  const { data } = await ctx.request.body().value;

  if (!data) {
    ctx.response.status = 400;
    ctx.response.body = { message: "Dados para criptografia não fornecidos" };
    return;
  }

  try {
    const encryptedData = await EncryptionService.encryptData(data, JWT_SECRET);
    ctx.response.body = { encryptedData };
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { message: "Erro ao criptografar dados" };
  }
});

// CORS middleware
app.use(async (ctx, next) => {
  ctx.response.headers.set("Access-Control-Allow-Origin", "*");
  ctx.response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  ctx.response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  await next();
});

// Usar o router na aplicação
app.use(router.routes());
app.use(router.allowedMethods());

// Welcome message
app.use((ctx) => {
  ctx.response.body = "Bem-vindo à API de Apostas!";
});

console.log("Servidor rodando em http://localhost:3000");
await app.listen({ port: 3000 });
