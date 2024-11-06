import { Component, inject } from '@angular/core';
import { AuthServices } from '../auth.services';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule, BrowserModule],
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent {
  private readonly authService = inject(AuthServices);
  private readonly router = inject(Router);

  /**
   * Logs out the user by invoking the logout method from AuthServices and
   * redirects the user to the sign-in page.
   */
  onLogout(): void {
    console.log('LogoutComponent.onLogout() - Logging out user');
    console.log('LogoutComponent.onLogout() - this.authService:', this.authService);
    try {
      if (!this.authService) {
        throw new Error('AuthService is not initialized');
      }
      this.authService.logout();
    } catch (error) {
      console.error('LogoutComponent.onLogout() - Error logging out user:', error);
      return;
    }

    console.log('LogoutComponent.onLogout() - Redirecting to sign-in page');
    console.log('LogoutComponent.onLogout() - this.router:', this.router);
    try {
      if (!this.router) {
        throw new Error('Router is not initialized');
      }
      this.router.navigate(['/autenticacao/signin']);
    } catch (error) {
      console.error('LogoutComponent.onLogout() - Error redirecting to sign-in page:', error);
    }
  }
}



