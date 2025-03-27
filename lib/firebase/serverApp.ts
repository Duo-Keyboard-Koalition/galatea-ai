import admin from "firebase-admin";
import serviceAccountConfig from "@/secrets/service-account.json"; // Import the JSON file directly
import {ServiceAccount} from "firebase-admin";
export const getFirebaseAdminApp = () => {
  if (!admin.apps.length) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccountConfig as ServiceAccount), // Explicitly cast to ServiceAccount
        });

      // Test credentials by making a request to Firebase services
      admin.auth().listUsers(1).catch((error) => {
        console.error("Failed to initialize Firebase Admin SDK:", error);
        process.exit(1); // Exit the process if credentials are invalid
      });
    } catch (error) {
      console.error("Error initializing Firebase Admin SDK:", error);
      process.exit(1); // Exit the process if initialization fails
    }
  }
  return admin;
};
