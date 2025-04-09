import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const authHeader = req.headers.get("Authorization");

  // Check if the Authorization header is present
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized: Missing or invalid token" }, { status: 401 });
  }

  const idToken = authHeader.split("Bearer ")[1];
  console.log("ID Token:", idToken);

  try {
    // Get the region from an environment variable
    const region = process.env.FIREBASE_REGION || "us-central1";
    const cloudFunctionUrl = `https://${region}-galatea-ai.cloudfunctions.net/verifyUser`;

    // Call the Firebase Cloud Function to verify the token
    const response = await fetch(cloudFunctionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
    });

    console.log("Response from Cloud Function:", response);

    if (!response.ok) {
      // Handle specific status codes
      if (response.status === 404) {
        console.error("Cloud Function not found");
        return NextResponse.json({ error: "Function not found" }, { status: 404 });
      }
      if (response.status === 401) {
        console.error("Unauthorized");
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      // Handle other errors
      const errorResponse = await response.text();
      console.error("Cloud Function error:", errorResponse);
      return NextResponse.json({ error: "Token verification failed" }, { status: response.status });
    }
    const textResponse = await response.text(); // Await the response text
    
    // there could be error for data
    console.log("Cloud Function response:",textResponse);
    // Respond with a protected message
    return NextResponse.json({ message: "Hello from protected", userId: textResponse }, { status: 200 });
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}