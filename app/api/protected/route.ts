import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/firebase/verifyToken";

export async function GET(req: Request) {
  const authHeader = req.headers.get("Authorization");

  // Check if the Authorization header is present
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const idToken = authHeader.split("Bearer ")[1];
  const userId = await verifyToken(idToken);

  // If the token is invalid or the user is not authenticated
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Respond with a protected message
  return NextResponse.json({ message: "Hello from protected", userId });
}