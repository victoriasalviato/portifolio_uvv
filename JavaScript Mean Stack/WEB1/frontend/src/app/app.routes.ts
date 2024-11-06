import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { MessagesComponent } from './messages/messages.component';
import { AuthenticationComponent } from './auth/authentication/authentication.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AUTH_ROUTES } from './auth/auth.routers';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/mensagens', pathMatch: 'full' },
  {
    path: 'mensagens',
    component: MessagesComponent,
    data: { title: 'Mensagens' },
    canActivate: [authGuard],
  },
  {
    path: 'autenticacao',
    component: AuthenticationComponent,
    data: { title: 'Autenticação' },
    children: AUTH_ROUTES,
  },
  { path: '**', component: PageNotFoundComponent, data: { title: 'Página não encontrada' } },
];

