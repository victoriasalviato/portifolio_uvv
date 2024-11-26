import { Component, OnInit } from '@angular/core';

// Definir interfaces para garantir tipagem consistente
interface Odd {
  nome: string;
  valor: number;
}

interface Game {
  nome: string;
  horario: Date;
  odds: Odd[];
}

@Component({
  selector: 'app-betting',
  templateUrl: './betting.component.html',
  styleUrls: ['./betting.component.scss'],
  standalone: false,
})
export class BettingComponent implements OnInit {
  // Tipando jogos com a interface Game
  games: Game[] = [
    {
      nome: 'Time A vs Time B',
      horario: new Date(),
      odds: [
        { nome: 'Time A', valor: 2.5 },
        { nome: 'Empate', valor: 3.1 },
        { nome: 'Time B', valor: 2.8 },
      ],
    },
    {
      nome: 'Time C vs Time D',
      horario: new Date(),
      odds: [
        { nome: 'Time C', valor: 1.9 },
        { nome: 'Empate', valor: 3.5 },
        { nome: 'Time D', valor: 3.2 },
      ],
    },
  ];

  selectedGame: Game | null = null; // Especificando que pode ser um Game ou null
  selectedOdd: Odd | null = null; // Especificando que pode ser uma Odd ou null
  betAmount: number = 0;

  // Histórico de apostas, mais específico
  betHistory: Array<{
    game: string;
    odd: string;
    value: number;
    amount: number;
  }> = [];

  constructor() {}

  ngOnInit() {}

  // Função para selecionar a odd do jogo
  selectOdd(game: Game, odd: Odd) {
    this.selectedGame = game;
    this.selectedOdd = odd;
    this.betAmount = 0; // Resetar o valor da aposta
  }

  // Função para realizar a aposta
  placeBet() {
    if (this.selectedGame && this.selectedOdd && this.betAmount > 0) {
      this.betHistory.push({
        game: this.selectedGame.nome,
        odd: this.selectedOdd.nome,
        value: this.selectedOdd.valor,
        amount: this.betAmount,
      });
      alert('Aposta realizada com sucesso!');

      // Resetando após a aposta
      this.selectedGame = null;
      this.selectedOdd = null;
      this.betAmount = 0;
    } else {
      alert('Por favor, preencha todos os campos para realizar a aposta.');
    }
  }
}
