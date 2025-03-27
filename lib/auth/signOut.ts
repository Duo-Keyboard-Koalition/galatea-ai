import { getAuth, signOut as firebaseSignOut } from "firebase/auth";
import app from "../firebase/firebase";

export const signOutUser = async (): Promise<void> => {
  const auth = getAuth(app);
  try {
    console.log("Starting sign out process...");
    await firebaseSignOut(auth);
    console.log("Sign-out successful");
    
    // Force a small delay to ensure Firebase auth state updates
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return;
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};
