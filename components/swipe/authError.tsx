"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface AuthErrorProps {
  message?: string;
  redirectPath?: string;
  redirectLabel?: string;
}

const AuthError: React.FC<AuthErrorProps> = ({ 
  message = "You must be signed in to view this content.",
  redirectPath = "/",
  redirectLabel = "Return to Home"
}) => {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-ivory-100 via-rose-50 to-earth-100">
      <Card className="p-8 max-w-md text-center">
        <div className="text-rose-600 text-5xl mb-4">🔒</div>
        <h2 className="text-2xl font-bold text-earth-800 mb-4">
          Authentication Required
        </h2>
        <p className="text-earth-600 mb-6">
          {message}
        </p>
        <div className="flex flex-col space-y-3">
          <Button
            className="bg-rose-600 hover:bg-rose-700 text-white"
            asChild
          >
            <Link href="/sign-in">Sign In</Link>
          </Button>
          <Button
            variant="outline"
            className="border-rose-300 text-rose-600 hover:bg-rose-50"
            asChild
          >
            <Link href={redirectPath}>{redirectLabel}</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AuthError;