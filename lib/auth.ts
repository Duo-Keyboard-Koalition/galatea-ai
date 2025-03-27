import { 
  GoogleAuthProvider, 
  getAuth, 
  signInWithPopup,  // Changed from signInWithRedirect
  getRedirectResult 
} from "firebase/auth";
import app from "./firebase/firebase";

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

// Use popup instead of redirect for more reliable auth flow
export const googleSignIn = async () => {
  try {
    console.log("Starting Google sign-in with popup...");
    const result = await signInWithPopup(auth, provider);
    console.log("Sign-in successful");
    return { user: result.user, success: true };
  } catch (error) {
    console.error("Error during Google sign-in:", error);
    throw error;
  }
};

// This function can be used if you still need to handle redirects
// from previous sign-in attempts
export const handleAuthRedirect = async () => {
  console.log("Checking for redirect result...");
  try {
    const userCred = await getRedirectResult(auth);
    console.log("Redirect result:", userCred ? "SUCCESS" : "NO RESULT");
    
    if (userCred) {
      const user = userCred.user;
      console.log("User from redirect:", user);
      return { user, success: true };
    }
    return { user: null, success: false };
  } catch (error) {
    console.error("Error handling redirect:", error);
    throw error;
  }
};