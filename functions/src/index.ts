/*
*
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

admin.initializeApp();

export const verifyUser = onRequest(async (request, response) => {
  const idToken = request.headers.authorization?.split("Bearer ")[1];

  if (!idToken) {
    response.status(401).send("Unauthorized: No token provided");
    return;
  }

  try {
    // Verify the ID token using Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    logger.info("User verified successfully", {uid: decodedToken.uid});
    response.status(200).send(`User is legitimate: ${decodedToken.uid}`);
  } catch (error) {
    logger.error("Error verifying user", {error});
    response.status(401).send("Unauthorized: Invalid token");
  }
});
