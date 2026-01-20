import 'zone.js/node';
import express from 'express';
import { renderModule } from '@angular/platform-server';  // This is for SSR
import { join } from 'path';
import { App } from './app/app';  // SSR module
import { environment } from './environments/environment';  // Environment setup

const app = express();
const DIST = join(process.cwd(), 'dist/browser');  // Path to browser build output

// Serve static files (images, CSS, JS, etc.)
app.get('*.*', express.static(DIST, { maxAge: '1y' }));

// Handle all requests for SSR rendering
app.get('*', async (req, res) => {
  try {
    console.log('Request URL:', req.url);  // Log the requested URL

    // Render the app for SSR (Server-Side Rendering)
    const html = await renderModule(App, {
      url: req.url,  // The requested URL
      document: '<app-root></app-root>'  // Template for the app
    });

    // Log the rendered HTML
    console.log('Rendered HTML:', html);

    // Send the rendered HTML back to the client
    res.send(html);
  } catch (err) {
    console.error('SSR error:', err);  // Log any errors
    res.status(500).send('Server error during rendering');
  }
});

// Start the Express server
app.listen(4000, () => {
  console.log('SSR is running on http://localhost:4000');
});
