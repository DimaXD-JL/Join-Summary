/**
 * Application configuration file.
 * This file defines the core providers required for the Angular application,
 * including routing, Firebase services, and animations.
 */

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

/**
 * Global application configuration.
 *
 * Provides:
 * - **Router configuration**: Uses `routes` from `app.routes.ts`.
 * - **Firebase services**: Initializes Firebase App and Firestore.
 * - **Animations**: Enables Angular animations asynchronously.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // Configures application routing
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'join-2f52c',
        appId: '1:91743585065:web:4f719db68c95445fb76d38',
        storageBucket: 'join-2f52c.firebasestorage.app',
        apiKey: 'AIzaSyAdJWobVs7-ygstomwN4pZXFhXU_XWqIhA',
        authDomain: 'join-2f52c.firebaseapp.com',
        messagingSenderId: '91743585065',
      })
    ), // Initializes Firebase with project credentials
    provideFirestore(() => getFirestore()), // Provides Firestore database
    provideAnimationsAsync(), // Enables Angular animations asynchronously
  ],
};
