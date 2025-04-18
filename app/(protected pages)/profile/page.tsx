"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAuth } from "firebase/auth";
export default function ProfilePage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [apiResponse, setApiResponse] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      router.push("/sign-in");
      return;
    }

    setLoading(false);
  }, [user, authLoading, router]);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(user, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const callProtectedAPI = async () => {
    try {
      const auth = getAuth();
      const idToken = await auth.currentUser?.getIdToken();
      console.log("ID Token:", idToken);
      const response = await fetch("/api/protected", {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to call protected API:", errorData.error);
        setApiResponse("Failed to call protected API");
        return;
      }

      const data = await response.json();
      console.log("Protected API Response:", data);
      setApiResponse(`Response: ${data.message}, User ID: ${data.userId}`);
    } catch (error) {
      console.error("Error calling protected API:", error);
      setApiResponse("Error calling protected API");
    }
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

          <Card className="p-6">
            <h2 className="text-xl font-bold text-earth-700 mb-4">
              Call Protected API
            </h2>
            <Button
              className="bg-rose-500 hover:bg-rose-600 text-white"
              onClick={callProtectedAPI}
            >
              Call Protected API
            </Button>
            {apiResponse && (
              <p className="mt-4 text-sm text-earth-700">{apiResponse}</p>
            )}
          </Card>
        </div>
      </div>
  );
}