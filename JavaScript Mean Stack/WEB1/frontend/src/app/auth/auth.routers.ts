import { Routes } from "@angular/router";
import { SignupComponent } from "./signup/signup.component";
import { SigninComponent } from "./signin/signin.component";
import { LogoutComponent } from "./logout/logout.component";
import { authGuard } from "./auth.guard";

export const AUTH_ROUTES: Routes = [
  { path: '', redirectTo: 'signup', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent, data: { title: 'Signup' } },
  { path: 'signin', component: SigninComponent, data: { title: 'Signin' } },
  { path: 'logout', component: LogoutComponent, canActivate: [authGuard], data: { title: 'Logout' } },
  { path: '**', redirectTo: 'signin', pathMatch: 'full' }
];

