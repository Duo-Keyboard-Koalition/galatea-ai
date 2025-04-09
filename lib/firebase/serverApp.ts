// Removed: import admin from "firebase-admin";
// Removed: import serviceAccountConfig from "@/secrets/service-account.json";
// Removed: import { ServiceAccount } from "firebase-admin";

// Removed: export const getFirebaseAdminApp = () => {
//   if (!admin.apps.length) {
//     try {
//       admin.initializeApp({
//         credential: admin.credential.cert(serviceAccountConfig as ServiceAccount),
//       });
//       admin.auth().listUsers(1).catch((error) => {
//         console.error("Failed to initialize Firebase Admin SDK:", error);
//         process.exit(1);
//       });
//     } catch (error) {
//       console.error("Error initializing Firebase Admin SDK:", error);
//       process.exit(1);
//     }
//   }
//   return admin;
// };
