import { mergeApplicationConfig, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jWTInterceptorInterceptor } from './Interceptors/jwt-interceptor.interceptor';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(), provideRouter(routes), provideHttpClient(withInterceptors([jWTInterceptorInterceptor]))
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
