import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthServices {
  private readonly baseUrl: string = 'http://localhost:3000/auth';

  constructor(private readonly http: HttpClient) {}

  // Login do usuário
  login(email: string, password: string): Observable<boolean> {
    if (!email || !password) {
      console.error('AuthServices.login - email or password is null or undefined');
      return of(false);
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(`${email}:${password}`),
    });

    return this.http
      .post<any>(`${this.baseUrl}/login`, null, { headers })
      .pipe(
        tap((response) => {
          if (response?.token) {
            this.setToken(response.token);
          }
        }),
        map((response) => !!response?.token),
        catchError((error) => {
          console.error('AuthServices.login - error:', error);
          return of(false);
        })
      );
  }

  // Registro de um novo usuário
  register(user: User): Observable<boolean> {
    if (!user) {
      console.error('AuthServices.register - user is null or undefined');
      return of(false);
    }

    return this.http
      .post<any>(`${this.baseUrl}/register`, user)
      .pipe(
        tap((response) => {
          if (response?.token) {
            this.setToken(response.token);
          }
        }),
        map((response) => !!response?.token),
        catchError((error) => {
          console.error('AuthServices.register - error:', error);
          return of(false);
        })
      );
  }

  // Logout do usuário
  logout(): void {
    localStorage.removeItem('token');
  }

  // Verifica se o usuário está logado
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Obtém o token armazenado no localStorage
  getToken(): string | null {
    try {
      return localStorage.getItem('token');
    } catch (error) {
      console.error('AuthServices.getToken - error getting token', error);
      return null;
    }
  }

  // Decodifica o token JWT para extrair o usuário
  user(): User | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    try {
      const payload = token.split('.')[1];
      const decoded = window.atob(payload);
      const decodedJson = JSON.parse(decoded);
      return decodedJson.user ?? null;
    } catch (error) {
      console.error('AuthServices.user - error decoding token', error);
      return null;
    }
  }

  // Define o token no localStorage
  private setToken(token: string): void {
    try {
      localStorage.setItem('token', token);
    } catch (error) {
      console.error('AuthServices.setToken - error setting token', error);
    }
  }
}
