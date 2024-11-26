import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent {
  encryptData(data: string) {
    const keyString = 'minha-chave';
    const keyData = new TextEncoder().encode(keyString);

    crypto.subtle
      .importKey('raw', keyData, { name: 'AES-GCM' }, false, ['encrypt'])
      .then((cryptoKey) => {
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const encodedData = new TextEncoder().encode(data);

        crypto.subtle
          .encrypt({ name: 'AES-GCM', iv }, cryptoKey, encodedData)
          .then((encryptedData) => {
            console.log('Dados criptografados:', new Uint8Array(encryptedData));
          });
      });
  }

  // Propriedades e variáveis do componente
  titulo: string = 'Plataforma de Apostas';
  descricao: string = 'Aposte com responsabilidade e diversão!';
  opcoesMenu: Array<string> = [
    'Início',
    'Jogos',
    'Minhas Apostas',
    'Ajuda',
    'Configurações',
  ];
  jogosDisponiveis: Array<Jogo> = [
    {
      id: 1,
      nome: 'Jogo de Futebol',
      descricao: 'Times locais e internacionais competindo!',
      imagem: 'futebol.png',
    },
    {
      id: 2,
      nome: 'Jogo de Basquete',
      descricao: 'Aposte nas melhores ligas!',
      imagem: 'basquete.png',
    },
    {
      id: 3,
      nome: 'Corrida de Cavalos',
      descricao: 'Velocidade e emoção nas pistas!',
      imagem: 'cavalos.png',
    },
  ];

  // Métodos para interações do usuário
  aoClicarMenu(opcao: string): void {
    console.log(`Menu clicado: ${opcao}`);
    // Navegar para a rota correspondente
  }

  aoSelecionarJogo(jogo: Jogo): void {
    console.log(`Jogo selecionado: ${jogo.nome}`);
    // Lógica para exibir detalhes do jogo
  }

  aoApostar(jogo: Jogo): void {
    console.log(`Aposta realizada em: ${jogo.nome}`);
    // Lógica para processar a aposta
  }
}

// Interface para definir os tipos de dados usados no componente
interface Jogo {
  id: number;
  nome: string;
  descricao: string;
  imagem: string;
}
