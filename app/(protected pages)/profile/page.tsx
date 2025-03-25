"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import { Card } from "@/components/ui/card";

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      router.push('/sign-in');
      return;
    }

    setLoading(false);
  }, [user, authLoading, router]);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(user, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (authLoading || loading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-600"></div>
          <div className="text-2xl text-earth-800">Loading profile...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full p-6 overflow-y-auto">
      <h1 className="text-3xl font-bold text-earth-800 mb-6">My Profile</h1>
      
      <div className="flex flex-col space-y-6">
        <Card className="p-6">
          <h2 className="text-xl font-bold text-earth-700 mb-4">User JSON</h2>
          <div className="relative bg-gray-100 p-4 rounded-md">
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 text-sm text-white bg-rose-500 hover:bg-rose-600 px-2 py-1 rounded"
            >
              {copied ? "✓ Copied" : "Copy"}
            </button>
            <pre
              className="text-sm text-gray-800 overflow-auto max-h-[60vh]"
              style={{
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                maxWidth: "100%",
              }}
            >
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
        </Card>
      </div>
    </div>
  );
}