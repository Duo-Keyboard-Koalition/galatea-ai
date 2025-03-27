import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
  User as FirebaseUser,
  getAuth
} from "firebase/auth";

import app from "../firebase";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Define the custom User interface
export interface User {
  uid: string; // Unique identifier for the user
  email: string | null; // User's email address
  displayName: string | null; // User's display name
  photoURL: string | null; // URL to the user's profile photo
  phoneNumber: string | null; // User's phone number
  emailVerified: boolean; // Whether the user's email is verified
  isAnonymous: boolean; // Whether the user signed in anonymously
  providerData: Array<{
    providerId: string; // The provider ID (e.g., "google.com")
    uid: string; // User ID for the provider
    displayName: string | null; // Display name from the provider
    email: string | null; // Email from the provider
    phoneNumber: string | null; // Phone number from the provider
    photoURL: string | null; // Profile photo URL from the provider
  }>; // Array of provider-specific user information
  metadata: {
    creationTime?: string; // When the user account was created
    lastSignInTime?: string; // When the user last signed in
  }; // Metadata about the user
  tenantId: string | null; // Tenant ID for multi-tenancy
}

// Map Firebase User to the custom User type
function mapFirebaseUserToUser(firebaseUser: FirebaseUser | null): User | null {
  if (!firebaseUser) return null;

  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
    photoURL: firebaseUser.photoURL,
    phoneNumber: firebaseUser.phoneNumber,
    emailVerified: firebaseUser.emailVerified,
    isAnonymous: firebaseUser.isAnonymous,
    providerData: firebaseUser.providerData.map((provider) => ({
      providerId: provider.providerId,
      uid: provider.uid,
      displayName: provider.displayName,
      email: provider.email,
      phoneNumber: provider.phoneNumber,
      photoURL: provider.photoURL,
    })),
    metadata: {
      creationTime: firebaseUser.metadata.creationTime || undefined,
      lastSignInTime: firebaseUser.metadata.lastSignInTime || undefined,
    },
    tenantId: firebaseUser.tenantId,
  };
}

// Define the callback type for auth state changes
interface AuthStateChangedCallback {
  (user: User | null): void;
}

// Wrapper for Firebase's onAuthStateChanged
export function onAuthStateChanged(cb: AuthStateChangedCallback) {
  return _onAuthStateChanged(auth, (firebaseUser) => {
    const user = mapFirebaseUserToUser(firebaseUser);
    cb(user);
  });
}

// Function to sign in with Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { user: result.user, success: true };
  } catch (error) {
    console.error("Error during Google sign-in:", error);
    throw error;
  }
};

// Function to sign out
export const signOut = async () => {
  try {
    console.log("Starting sign out process...");
    await auth.signOut();
    console.log("Sign-out successful");
    // Force a small delay to ensure Firebase auth state updates
    await new Promise(resolve => setTimeout(resolve, 500));
    // Force reload the page to clear any cached auth state
    window.location.href = '/';
    return true;
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};