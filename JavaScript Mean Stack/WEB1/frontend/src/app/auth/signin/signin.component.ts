import {Component, inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthServices} from "../auth.services";
import {Router, RouterLink} from "@angular/router";
import {NgClass} from "@angular/common";
import {User} from "../user.model";
import { CommonModule } from '@angular/common';
import {catchError, tap} from "rxjs";
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgClass, CommonModule, BrowserModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  myFormIn!: FormGroup;
  private authService = inject(AuthServices);

  constructor(private fb: FormBuilder, private router: Router) {
    console.log('SigninComponent.constructor - Creating SigninComponent instance...');
    if (!fb) {
      console.error('SigninComponent.constructor - FormBuilder is null');
      throw new Error('FormBuilder is null');
    }
    if (!router) {
      console.error('SigninComponent.constructor - Router is null');
      throw new Error('Router is null');
    }
    console.log('SigninComponent.constructor - SigninComponent instance created.');
  }

  ngOnInit(): void {
    console.log('SigninComponent.ngOnInit()');
    console.log('Creating form group with email and password fields...');
    if (!this.fb) {
      console.error('SigninComponent.ngOnInit - FormBuilder is null');
      throw new Error('FormBuilder is null');
    }
    this.myFormIn = this.fb.group({
      email: [
        null,
        Validators.compose([
          Validators.required,
          Validators.email
        ])],
      password: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(4)
        ])]
    });
    if (!this.myFormIn) {
      console.error('SigninComponent.ngOnInit - myFormIn is null');
      throw new Error('myFormIn is null');
    }
    console.log('myFormIn:', this.myFormIn);
    console.log('Form group created:', this.myFormIn);
  }

  onSubmit() {
    console.log('SigninComponent.onSubmit - Submitting login form with values:', this.myFormIn.value);
    const {email, password} = this.myFormIn.value;
    if (email === null || email === undefined || password === null || password === undefined) {
      console.log('SigninComponent.onSubmit - Null or undefined email or password, not processing login request');
      return;
    }
    console.log('SigninComponent.onSubmit - Calling login API with email:', email, 'and password:', password);
    try {
      this.authService.login(email, password).subscribe({
        next: (response: any) => {
          console.log('SigninComponent.onSubmit - Login response:', response);
          if (response === null || response === undefined) {
            console.log('SigninComponent.onSubmit - Login failed, response is null or undefined');
          } else if (response.success === true) {
            console.log('SigninComponent.onSubmit - Login successful, redirecting to home route');
            this.router.navigate(['/']);
          } else {
            console.log('SigninComponent.onSubmit - Login failed');
          }
        },
        error: (error: any) => {
          if (error === null || error === undefined) {
            console.log('SigninComponent.onSubmit - Error occurred during login attempt, but error is null or undefined');
          } else {
            console.log('SigninComponent.onSubmit - Error occurred during login attempt');
            console.log('Error details:', error);
          }
        }
      });
    } catch (error) {
      console.log('SigninComponent.onSubmit - Error occurred during login attempt');
      console.log('Error details:', error);
    }
    console.log('SigninComponent.onSubmit - Resetting form');
    this.myFormIn.reset();
  }
}


