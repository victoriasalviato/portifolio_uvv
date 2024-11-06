import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { MessageService } from './messages/message.services';
import { AuthServices } from './auth/auth.services';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    MessageService,
    AuthServices,
  ],
};

export const appConfigTesting: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    { provide: MessageService, useValue: {} },
    {
      provide: AuthServices,
      useValue: {
        user: () => ({ name: 'Test User', email: 'test@example.com' })
      }
    },
  ],
};

