import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

export interface Jogo {
  id: number;
  nome: string;
  data: string; // ou Date, dependendo de como você recebe a data
  hora: string; // ou Date, se você preferir
  odd: number;
}

@Component({
  selector: 'app-jogos',
  templateUrl: './jogos.component.html',
  styleUrls: ['./jogos.component.scss'],
  standalone: false,
})
export class JogosComponent implements OnInit {
  jogos: Jogo[] = []; // Usando a interface Jogo
  filteredJogos: Jogo[] = []; // Usando a interface Jogo
  searchQuery: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.carregarJogos();
  }

  carregarJogos() {
    this.http.get<Jogo[]>('http://localhost:8000/api/jogos').subscribe({
      next: (data: Jogo[]) => {
        this.jogos = data;
        this.filteredJogos = [...this.jogos]; // Inicializa com todos os jogos
      },
      error: (error: HttpErrorResponse) => {
        console.error('Erro ao carregar os jogos:', error);
        alert('Ocorreu um erro ao carregar os jogos.');
      },
    });
  }

  filtrarJogos() {
    const query = this.searchQuery.toLowerCase();
    this.filteredJogos = this.jogos.filter((jogo) =>
      jogo.nome.toLowerCase().includes(query),
    );
  }

  apostar(jogoId: number) {
    console.log('Apostando no jogo com ID:', jogoId);
    // Lógica para realizar a aposta pode ser adicionada aqui
  }
}
