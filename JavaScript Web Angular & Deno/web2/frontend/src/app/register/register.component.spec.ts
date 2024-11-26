import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RegisterComponent } from './register.component';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form when all fields are filled', () => {
    component.registerForm.setValue({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    });
    expect(component.registerForm.valid).toBeTrue();
  });

  it('should not submit an invalid form', () => {
    component.registerForm.setValue({
      name: '',
      email: 'invalid-email',
      password: '123',
    });
    expect(component.registerForm.invalid).toBeTrue();
  });
});
