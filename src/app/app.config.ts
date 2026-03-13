import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { API_BASE_URL } from './token/api-token';
import { environment } from './environments/environment.prod';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), 
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
     {
      provide: API_BASE_URL,
      useValue : environment.baseURL,
    },
    {
      provide: API_BASE_URL,
      useValue : `https://ecommerce.routemisr.com/api/v1`
    },
   
  ]
};
