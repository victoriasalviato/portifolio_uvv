import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { JogosComponent } from './jogos.component';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

describe('JogosComponent', () => {
  let component: JogosComponent;
  let fixture: ComponentFixture<JogosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JogosComponent],
      imports: [],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JogosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load games on init', () => {
    const spy = spyOn(component, 'carregarJogos');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });
});
