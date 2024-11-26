import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false,
})
export class HomeComponent {
  constructor(private router: Router) {}

  navigateToBetting() {
    this.router.navigate(['/betting']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
