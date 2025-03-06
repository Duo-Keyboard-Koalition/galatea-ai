import { 
  GoogleAuthProvider, 
  getAuth, 
  signInWithRedirect,
  getRedirectResult 
} from "firebase/auth";
import app from "./firebase";

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export const googleSignIn = async () => {
  try {
    console.log("Starting Google sign-in redirect...");
    await signInWithRedirect(auth, provider);
    // We never reach this point due to redirect
    console.log("This line won't execute due to redirect");
  } catch (error) {
    console.error("Error initiating Google sign-in:", error);
    throw error;
  }
};

export const handleAuthRedirect = async () => {
  console.log("Checking for redirect result...");
  try {
    const result = await getRedirectResult(auth);
    console.log("Redirect result:", result ? "SUCCESS" : "NO RESULT");
    
    if (result) {
      const user = result.user;
      console.log("User from redirect:", user);
      return user;
    }
    return null;
  } catch (error) {
    console.error("Error handling redirect:", error);
    throw error;
  }
};