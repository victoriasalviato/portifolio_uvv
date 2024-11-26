import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component.ts';
import { LoginComponent } from './login/login.component.ts';
import { RegisterComponent } from './register/register.component.ts';
import { BettingComponent } from './betting/betting.component.ts';
import { JogosComponent } from './jogos/jogos.component.ts';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'betting', component: BettingComponent },
  { path: 'jogos', component: JogosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
