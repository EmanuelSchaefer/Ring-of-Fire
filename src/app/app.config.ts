import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), importProvidersFrom(provideFirebaseApp(() => initializeApp({ "projectId": "ring-of-fire-16588", "appId": "1:861548770651:web:967e1e74f62a6d98b9967e", "storageBucket": "ring-of-fire-16588.appspot.com", "apiKey": "AIzaSyDCvofVW3hyOmCluOWlakhG17oqpZPjrhk", "authDomain": "ring-of-fire-16588.firebaseapp.com", "messagingSenderId": "861548770651" }))), importProvidersFrom(provideFirestore(() => getFirestore()))]
};