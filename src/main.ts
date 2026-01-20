import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';  // The root component
import { appConfig } from './app/app.config';
import { environment } from './environments/environment';

// Enable production mode if environment is production
if (environment.production) {
  enableProdMode();
}

// Bootstrapping the Angular application
bootstrapApplication(App, appConfig)
  .catch(err => console.error(err));
