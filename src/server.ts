import 'zone.js/node';  // Required for Angular Universal
import { enableProdMode } from '@angular/core';
import express from 'express';  // Correct import for Express
import { join } from 'path';
import { readFileSync } from 'fs';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { App } from './app/app';  // Ensure this file exists and is correctly imported
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const app = express();

// Path to the dist folder where the Angular app is built
const DIST_FOLDER = join(process.cwd(), 'dist/browser');
const indexHtml = readFileSync(join(DIST_FOLDER, 'index.html'), 'utf-8');

// Serve static files (images, css, js)
app.get('*.*', express.static(DIST_FOLDER, {
  maxAge: '1y'
}));

// Set up Angular Universal engine for SSR (using ngExpressEngine)
app.engine('html', ngExpressEngine({
  bootstrap: App
}));

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

// Universal route (this will render Angular Universal pages)
app.get('*', (req: express.Request, res: express.Response) => {
  res.render('index', { req, res });
});

// Start the server
app.listen(4000, () => {
  console.log('Angular Universal server is running at http://localhost:4000');
});
