'use client';

import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { clientFirebaseConfig } from "./config";

export const firebaseApp =
  getApps().length === 0 ? initializeApp(clientFirebaseConfig) : getApps()[0];

export const analytics = typeof window !== "undefined" ? getAnalytics(firebaseApp) : null;
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
