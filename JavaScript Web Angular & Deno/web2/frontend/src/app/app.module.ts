import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component.ts';
import { LoginComponent } from './login/login.component.ts';
import { JogosComponent } from './jogos/jogos.component.ts';
import { HomeComponent } from './home/home.component.ts';
import { AppComponent } from './app.component.ts';
import { BettingComponent } from './betting/betting.component.ts';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    JogosComponent,
    RegisterComponent,
    LoginComponent,
    BettingComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'jogos', component: JogosComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'betting', component: BettingComponent },
    ]),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [HomeComponent, JogosComponent],
})
export class AppModule {}
