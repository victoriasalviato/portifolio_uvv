import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AUTH_ROUTES } from './auth.routers';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(AUTH_ROUTES),
    SigninComponent,
    SignupComponent
  ],
  exports: [
    SigninComponent,
    SignupComponent
  ]
})
export class AuthModule { }



