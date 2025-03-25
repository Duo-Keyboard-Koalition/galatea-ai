"use client";

import { useAuth } from "@/components/AuthContext";
import SignOutOverlay from "@/components/SignOutOverlay";

export default function AuthOverlays() {
  const { isSigningOut } = useAuth();

  return (
    <>
      {isSigningOut && <SignOutOverlay />}
    </>
  );
}
