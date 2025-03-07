"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { 
  User, 
  getAuth,
  onAuthStateChanged,
  signOut as firebaseSignOut,
  getRedirectResult
} from "firebase/auth";
import { googleSignIn } from "@/lib/auth";
import { useRouter } from "next/navigation";
import app from "@/lib/firebase";

// Define the shape of our auth context
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
}

// Create context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  signIn: async () => {},
  signOut: async () => {},
  isAuthenticated: false,
});

// Export a hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Props for the AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

// Provider component that wraps the app and makes auth available
export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const auth = getAuth(app);

  // Listen to Firebase auth state changes
  useEffect(() => {
    console.log("Setting up auth state listener");
    
    // Check for redirect result on initial load
    const checkRedirect = async () => {
      try {
        console.log("Checking for redirect result...");
        const result = await getRedirectResult(auth);
        if (result && result.user) {
          console.log("Redirect sign-in successful:", result.user.displayName);
          // No need to set user manually, onAuthStateChanged will handle it
        }
      } catch (redirectError) {
        console.error("Redirect error:", redirectError);
        setError((redirectError as Error).message || "Failed to process sign-in redirect");
      }
    };
    
    checkRedirect();
    
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed:", currentUser ? `Logged in as ${currentUser.displayName || currentUser.email}` : "Not logged in");
      setUser(currentUser);
      setLoading(false);
    }, (authError) => {
      console.error("Auth state error:", authError);
      setError(authError.message);
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, [auth, router]);

  // Sign in with Google
  const handleSignIn = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      await googleSignIn();
      // Using redirect method, so we won't reach this point
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error during sign in:", error);
        setError(error.message || "Failed to sign in");
      } else {
        console.error("Unknown error during sign in:", error);
      }
    }
  };

  // Sign out
  const handleSignOut = async (): Promise<void> => {
    try {
      setLoading(true);
      await firebaseSignOut(auth);
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error during sign out:", error);
        setError(error.message || "Failed to sign out");
      } else {
        console.error("Unknown error during sign out:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    signIn: handleSignIn,
    signOut: handleSignOut,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;