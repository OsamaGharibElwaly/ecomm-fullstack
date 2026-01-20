import 'zone.js/node';
import express from 'express';
import { renderModule } from '@angular/platform-server';import { join } from 'path';
import {App } from './app/app';  // Make sureApp is set up for SSR
import { environment } from './environments/environment'; // Ensure to import the environment configuration

const app = express();
const DIST = join(process.cwd(), 'dist/browser');  // Path to the browser build output

// Serve static assets (images, CSS, JS, etc.)
app.get('*.*', express.static(DIST, { maxAge: '1y' }));

// Handle all requests for SSR
app.get('*', async (req, res) => {
  try {
    // Render the app for SSR (Server-Side Rendering)
    const html = await renderModule(App, {
      url: req.url,  // The requested URL
      document: '<app-root></app-root>'  // Your main Angular root component
    });

    // Send the rendered HTML back to the client
    res.send(html);
  } catch (err) {
    console.error('SSR error:', err);
    res.status(500).send('Server error during rendering');
  }
});

// Start the Express server
app.listen(4000, () => {
  console.log('SSR is running on http://localhost:4000');
});
