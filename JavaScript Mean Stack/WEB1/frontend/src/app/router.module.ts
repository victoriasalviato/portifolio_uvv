import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessagesComponent } from './messages/messages.component';
import { AuthenticationComponent } from './auth/authentication/authentication.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AUTH_ROUTES } from './auth/auth.routers';
import { authGuard } from './auth/auth.guard';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';

// Definindo as rotas principais da aplicação
export const APP_ROUTES: Routes = [
  { path: 'mensagens', component: MessagesComponent, data: { title: 'Mensagens' }, canActivate: [authGuard] },
  { path: 'autenticacao', component: AuthenticationComponent, data: { title: 'Autenticação' }, children: AUTH_ROUTES },
  { path: '**', component: PageNotFoundComponent, data: { title: 'Página não encontrada' } },
];

const routes: Routes = [
  { path: 'signup', component: SignupComponent },  // Corrigido: faltava a vírgula aqui
  { path: 'signin', component: SigninComponent },  // Corrigido: faltava a vírgula aqui
  { path: '**', redirectTo: 'mensagens' },
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

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],  // Usando a constante de rotas definidas acima
  exports: [RouterModule]
})
export class AppRoutingModule {}
