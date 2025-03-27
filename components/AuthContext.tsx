"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getAuth, onAuthStateChanged, signOut as firebaseSignOut, User } from "firebase/auth"; // Use Firebase's User type
import { useRouter } from "next/navigation";
import app from "@/lib/firebase/firebase";

// Define the shape of our auth context
interface AuthContextType {
  user: User | null; // Replace custom User with Firebase's User
  loading: boolean;
  error: Error | null;
  isAuthenticated: boolean;
  signOut: () => Promise<void>;
}

// Create context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  isAuthenticated: false,
  signOut: async () => {},
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
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();
  const auth = getAuth(app);

  // Implementation of sign out function
  const handleSignOut = async () => {
    try {
      console.log("Signing out from AuthContext...");
      await firebaseSignOut(auth);
      // Force clear the user state immediately
      setUser(null);
      router.push('/');
    } catch (err) {
      console.error("Error signing out:", err);
      setError(new Error("Failed to sign out"));
    }
  };

  // Listen to Firebase auth state changes
  useEffect(() => {
    console.log("Setting up auth state listener");
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        console.log(
          "Auth state changed:",
          currentUser ? `Logged in as ${currentUser.displayName || currentUser.email}` : "Not logged in"
        );
        if (currentUser) {
          setUser(currentUser); // Use Firebase's User directly
        } else {
          console.log("No user detected, clearing user state");
          setUser(null);
        }
        setLoading(false);
      },
      (authError) => {
        console.error("Auth state error:", authError);
        setError(authError);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [auth, router]);

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    signOut: handleSignOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
