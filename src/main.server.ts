import { enableProdMode } from '@angular/core';
import { platformServer } from '@angular/platform-server';
import { App } from './app/app';  // SSR module
import { environment } from './environments/environment';

// Enable production mode if environment is production
if (environment.production) {
  enableProdMode();
}

// Bootstrap the Angular application for the server (SSR)
platformServer().bootstrapModule(App)  // Use App for SSR
  .catch(err => console.error('SSR bootstrapping failed', err));
