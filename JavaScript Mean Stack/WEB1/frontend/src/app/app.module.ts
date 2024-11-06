import { AuthModule } from './auth/auth.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent, } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HeaderModule } from './header/header.module'; // Caminho relativo correto



const routes: Routes = [
  { path: '', redirectTo: 'mensagens', pathMatch: 'full' },
  { path: '**', redirectTo: 'mensagens' }
];

@NgModule({
  imports: [
    BrowserModule,
    AuthModule,
    RouterModule.forRoot(routes),
    HeaderModule,
    HeaderComponent
  ],
  providers: [],
})
export class AppModule { }

