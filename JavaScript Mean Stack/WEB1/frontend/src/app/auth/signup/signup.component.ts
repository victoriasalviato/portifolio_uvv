import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthServices } from '../auth.services';
import { NgClass } from '@angular/common';
import { User } from '../user.model';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgClass,
    CommonModule,
    BrowserModule
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  myForm!: FormGroup;

  private readonly authService = inject(AuthServices);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.myForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern("[a-zA-Z0-9\-\_\.]+@[a-zA-Z0-9\-\_\.]+")
      ]),
      password: new FormControl(null, Validators.required),
      termos: new FormControl(null, Validators.requiredTrue),
      sexo: new FormControl('Masculino'),
      dataNascimento: new FormControl(null),
    });
  }

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const { name, email, password, termos, sexo, dataNascimento } = this.myForm.value;
    const user = new User(name, email, password, termos, sexo, dataNascimento);

    this.authService.register(user).subscribe({
      next: (response) => {
        if (response) {
          this.router.navigate(['/']);
        } else {
          console.log('Erro ao registrar');
        }
      },
      error: (error) => {
        console.error('Erro ao registrar:', error);
      }
    });

    this.myForm.reset();
  }
}
