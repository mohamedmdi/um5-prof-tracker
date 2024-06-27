import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { serviceAccount } from '@/../um5-proftracker-firebase-adminsdk-qewn1-dc38d27ae1.json';

const firebaseAdminConfig = {
    credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY
      })
}

export function customInitApp() {
    if (getApps().length <= 0) {
        initializeApp(firebaseAdminConfig);
    }
}