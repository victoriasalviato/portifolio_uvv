import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component.ts';
import { BrowserModule } from '@angular/platform-browser';

describe('AppComponent', () => {
  let componente: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [BrowserModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    componente = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componente).toBeTruthy();
  });
});
