import {CanActivateFn, Router, UrlTree} from '@angular/router';
import {inject} from "@angular/core";
import {AuthServices} from './auth.services';
import {AuthenticationComponent} from "./authentication/authentication.component";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServices);
  const router = inject(Router);

  if (!authService) {
    throw new Error('authGuard: authService is null. Ensure AuthServices is provided in your module.');
  }

  if (!router) {
    throw new Error('authGuard: router is null. Ensure Router is provided in your module.');
  }

  console.log('authGuard', route, state);

  if (route.component === AuthenticationComponent) {
    console.log('authGuard: skipping authentication component');
    return !authService.isLoggedIn();
  }

  console.log('authGuard: checking if user is logged in');
  return authService.isLoggedIn()
    ? true
    : router.createUrlTree(['/autenticacao/signin'], { queryParams: { returnUrl: state.url } });
};


