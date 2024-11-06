import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from '../signin/signin.component';
import { SignupComponent } from '../signup/signup.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    SigninComponent,
    SignupComponent
  ]
})
export class AuthenticationComponent {}

