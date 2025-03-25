import { NextResponse } from 'next/server';

// Define interfaces for type safety
interface Profile {
  id: string;
  name: string;
  age: number;
  bio: string;
  images: string[];
  interests?: string[];
  location?: string;
}

interface Match {
  id: string;
  profile: Profile;
}

export async function GET() {
  try {
    const matches: Match[] = [
      {
        id: "match_mekkana",
        profile: {
          id: "1",
          name: "Mekkana",
          age: 25,
          bio: "Creative artist with a passion for digital art and design. I love spending my weekends at galleries and exploring new coffee shops in the city.",
          images: [
            "/girl-profiles/mekkana-profile.png", 
            "/girl-profiles/mekkana-profile-2.png", 
            "/girl-profiles/mekkana-profile-3.png"
          ],
          interests: ["Art", "Photography", "Coffee"],
          location: "New York City",
        }
      }
    ];

    return NextResponse.json({ matches });
  } catch (error) {
    console.error("Error fetching matches:", error);
    return NextResponse.json({ error: "Failed to fetch matches" }, { status: 500 });
  }
}