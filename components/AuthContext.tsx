"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import app from "@/lib/firebase";

// Define the shape of the user object
interface ProviderData {
  providerId: string;
  uid: string;
  displayName: string;
  email: string;
  phoneNumber: string | null;
  photoURL: string;
}

interface StsTokenManager {
  refreshToken: string;
  accessToken: string;
  expirationTime: number;
}

interface User {
  uid: string;
  email: string;
  emailVerified: boolean;
  displayName: string;
  isAnonymous: boolean;
  photoURL: string;
  providerData: ProviderData[];
  stsTokenManager: StsTokenManager;
  createdAt: string;
  lastLoginAt: string;
  apiKey: string;
  appName: string;
}

// Define the shape of our auth context
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

// Create context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
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
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        console.log(
          "Auth state changed:",
          currentUser ? `Logged in as ${currentUser.displayName || currentUser.email}` : "Not logged in"
        );
        if (currentUser) {
          const mappedUser: User = {
            uid: currentUser.uid,
            email: currentUser.email || "",
            emailVerified: currentUser.emailVerified,
            displayName: currentUser.displayName || "",
            isAnonymous: currentUser.isAnonymous,
            photoURL: currentUser.photoURL || "",
            providerData: currentUser.providerData.map((provider) => ({
              providerId: provider.providerId,
              uid: provider.uid,
              displayName: provider.displayName || "",
              email: provider.email || "",
              phoneNumber: provider.phoneNumber,
              photoURL: provider.photoURL || "",
            })),
            stsTokenManager: {
              refreshToken: currentUser.refreshToken || "",
              accessToken: "", // Firebase does not expose this directly
              expirationTime: 0, // Firebase does not expose this directly
            },
            createdAt: "", // Firebase does not expose this directly
            lastLoginAt: "", // Firebase does not expose this directly
            apiKey: "", // Firebase does not expose this directly
            appName: auth.app.name,
          };
          setUser(mappedUser);
        } else {
          setUser(null);
        }
        setLoading(false);

        // If user just signed in, redirect to swipe page
        if (currentUser && !user) {
          router.push("/swipe");
        }
      },
      (authError) => {
        console.error("Auth state error:", authError);
        setError(authError.message);
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
