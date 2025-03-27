import admin from "firebase-admin";
import {serverFirebaseConfig} from "./config"; // Path to your downloaded JSON

// Function to initialize Firebase Admin SDK
export const getFirebaseAdminApp = () => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: serverFirebaseConfig.project_id,
        clientEmail: serverFirebaseConfig.client_email,
        privateKey: serverFirebaseConfig.private_key.replace(/\\n/g, "\n"), // Ensure correct formatting of privateKey
      }),
    });
  }
  return admin;
};
