import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
  User as FirebaseUser,
  getAuth
} from "firebase/auth";

import app from "./firebase";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();


// Define the callback type for auth state changes
interface AuthStateChangedCallback {
  (user: FirebaseUser | null): void;
}

// Wrapper for Firebase's onAuthStateChanged
export function onAuthStateChanged(cb: AuthStateChangedCallback) {
  return _onAuthStateChanged(auth, (firebaseUser) => {
    cb(firebaseUser);
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