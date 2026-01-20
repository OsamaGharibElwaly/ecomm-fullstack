import 'zone.js/node';  // Import zone.js for SSR
import express from 'express';  // Import Express
import { renderModule } from '@angular/platform-server';  // Import renderModule from @angular/platform-server
import { join } from 'path';  // Path module for setting up file paths
import { App } from './app/app';  // Import the server module (not just the root component)
import { environment } from './environments/environment';  // Ensure the environment configuration is correct

const app = express();
const DIST = join(process.cwd(), 'dist/browser');  // Path to the browser build output

// Serve static files (images, CSS, JS, etc.)
app.get('*.*', express.static(DIST, { maxAge: '1y' }));

// Handle all requests for SSR
app.get('*', async (req, res) => {
  try {
    // Render the app for SSR (Server-Side Rendering) with App
    const html = await renderModule(App, {  // Pass App (SSR version)
      url: req.url,  // The requested URL
      document: '<app-root></app-root>'  // Root Angular component to render
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
