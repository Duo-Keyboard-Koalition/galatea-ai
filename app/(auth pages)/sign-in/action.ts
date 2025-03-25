import { getAuth, signOut as firebaseSignOut } from "firebase/auth";
import { googleSignIn } from "@/lib/auth";
import app from "@/lib/firebase";

const auth = getAuth(app);

// Sign in with Google
export const signInWithGoogle = async (): Promise<void> => {
  try {
    await googleSignIn();
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error during sign in:", error);
      throw new Error(error.message || "Failed to sign in");
    } else {
      console.error("Unknown error during sign in:", error);
      throw new Error("Unknown error occurred during sign in");
    }
  }
};

// Sign out
export const signOut = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error during sign out:", error);
      throw new Error(error.message || "Failed to sign out");
    } else {
      console.error("Unknown error during sign out:", error);
      throw new Error("Unknown error occurred during sign out");
    }
  }
};