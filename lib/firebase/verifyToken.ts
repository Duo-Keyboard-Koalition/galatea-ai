// verifyToken.ts

import { getAuth } from "firebase-admin/auth"; // Import getAuth for authentication
import { getFirebaseAdminApp } from "./serverApp"; // Import getFirebaseAdminApp to initialize Firebase Admin

// Function to verify an ID token
export async function verifyToken(idToken: string): Promise<string | null> {
  try {
    const app = getFirebaseAdminApp(); // Initialize or retrieve Firebase Admin app
    const auth = getAuth(app.app()); // Get the auth instance from the initialized app
    const decodedToken = await auth.verifyIdToken(idToken); // Verify the ID token
    return decodedToken.uid; // Return the user's UID if the token is valid
  } catch (error) {
    console.error("Error verifying ID token:", error);
    return null; // Return null if verification fails
  }
}
