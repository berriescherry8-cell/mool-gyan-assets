import { initializeApp, getApp, getApps, type FirebaseOptions } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { firebaseConfig } from './config';

// This file is intended for server-side use ONLY.

let firestore: ReturnType<typeof getFirestore>;
let storage: ReturnType<typeof getStorage>;

function initializeFirebase() {
    if (!getApps().length) {
        // This will use the config from firebase/config.ts
        // In a real App Hosting environment, you might use environment variables
        // and initializeApp() without parameters.
        initializeApp(firebaseConfig);
    }
    const app = getApp();
    firestore = getFirestore(app);
    storage = getStorage(app);
    return { firestore, storage };
}

// Initialize on module load
const services = initializeFirebase();

// Export the initialized services
export const { firestore: serverFirestore, storage: serverStorage } = services;
export { initializeFirebase };
