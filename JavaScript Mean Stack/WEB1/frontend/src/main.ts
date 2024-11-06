import { enableProdMode } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { bootstrapApplication } from '@angular/platform-browser';
import { environment } from './environment';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'mensagens', pathMatch: 'full' },
  { path: '**', redirectTo: 'mensagens' }
];


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    // Outros provedores, como AuthModule, se necessário
  ]
})
  .catch(err => console.error(err));

if (environment.production) {
    enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        provideAnimations(),
        ...appConfig.providers,
    ],
})
.catch((err) => console.error(err));

