import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

// Definição da interface fora do componente para melhor organização
interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    password: string;
    created_at: Date;
  };
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false,
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Tipando a resposta como LoginResponse
      this.http
        .post<LoginResponse>('http://localhost:8000/api/login', {
          email,
          password,
        })
        .subscribe({
          next: (response: LoginResponse) => {
            console.log('Login bem-sucedido:', response);
            localStorage.setItem('jwt', response.token); // Armazena o token
            this.router.navigate(['/jogos']); // Redireciona para a página de jogos
          },
          error: (err: HttpErrorResponse) => {
            console.error('Erro ao fazer login:', err);
            alert('Email ou senha inválidos!');
          },
        });
    }
  }
}
