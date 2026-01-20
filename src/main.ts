import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';  // The root component
import { environment } from './environments/environment';

// Enable production mode if environment is production
if (environment.production) {
  enableProdMode();
}

// Bootstrapping the Angular application
bootstrapApplication(App)
  .catch(err => console.error(err));
