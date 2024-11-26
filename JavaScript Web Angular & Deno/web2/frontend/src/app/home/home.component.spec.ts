import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component.ts';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to betting page', () => {
    const router = TestBed.inject(RouterTestingModule);
    spyOn(router, 'navigate');
    component.navigateToBetting();
    expect(router.navigate).toHaveBeenCalledWith(['/betting']);
  });
});
