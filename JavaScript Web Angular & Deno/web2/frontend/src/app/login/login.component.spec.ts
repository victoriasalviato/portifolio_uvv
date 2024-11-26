import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form when email and password are provided', () => {
    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'password123',
    });
    expect(component.loginForm.valid).toBeTrue();
  });

  it('should not submit an invalid form', () => {
    component.loginForm.setValue({ email: '', password: '' });
    expect(component.loginForm.invalid).toBeTrue();
  });
});
