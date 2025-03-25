import { getAuth, signOut } from "firebase/auth";

export const performSignOut = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
    console.log("Sign-out successful.");
  } catch (error) {
    console.error("Error signing out:", error);
  }
};
