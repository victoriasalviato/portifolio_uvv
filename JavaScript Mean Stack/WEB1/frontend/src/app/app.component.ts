import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessagesComponent } from './messages/messages.component';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AuthServices } from './auth/auth.services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MessagesComponent, HeaderComponent, CommonModule, BrowserModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template: `
    <app-header></app-header>
    <div class="container h-100">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent implements OnInit {
  user: any;  // Declare a propriedade user

  constructor(private authService: AuthServices) {}

  ngOnInit() {
    // Aqui você pode definir a propriedade 'user' com os dados do seu serviço de autenticação
    this.user = this.authService.user();
  }
}


