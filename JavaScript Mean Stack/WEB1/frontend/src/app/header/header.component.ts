import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthServices } from "../auth/auth.services";
import { LogoutComponent } from "../auth/logout/logout.component";
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    LogoutComponent,
    CommonModule,
    BrowserModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  private authService = inject(AuthServices);
  user = this.authService.user();

  // Verificar se o usuário existe antes de acessar
  get userName(): string | null {
    return this.user ? this.user.name : null;
  }

  isLoggedIn(): boolean {
    if (!this.authService) {
      console.error('HeaderComponent: authService is null');
      return false;
    }

    try {
      return this.authService.isLoggedIn();
    } catch (error) {
      console.error('HeaderComponent: error when calling authService.isLoggedIn()', error);
      return false;
    }
  }
}
