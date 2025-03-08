import { NextResponse } from 'next/server';

export async function GET() {
  // You could add authentication/authorization checks here
  // And eventually connect to a database

  const profiles = [
    {
      id: "1",
      name: "Mekkana",
      age: 25,
      bio: "Creative artist with a passion for digital art and design. I love spending my weekends at galleries and exploring new coffee shops in the city.",
      images: [
        "/girl-profiles/mekkana-profile.png",
        "/girl-profiles/mekkana-profile-2.png",
        "/girl-profiles/mekkana-profile-3.png",
      ],
      interests: ["Art", "Photography", "Coffee"],
      location: "New York City",
    },
    {
      id: "2",
      name: "Eliana",
      age: 23,
      bio: "Bookworm who loves cozy evenings and philosophical discussions. When I'm not reading, you can find me hiking or trying new recipes.",
      images: [
        "/girl-profiles/eliana-profile.png",
        "/girl-profiles/eliana-profile-2.png",
        "/girl-profiles/eliana-profile-3.png",
      ],
      interests: ["Books", "Hiking", "Cooking"],
      location: "San Francisco",
    },
    {
      id: "3",
      name: "Zara",
      age: 27,
      bio: "Adventure seeker with a love for hiking and photography. My goal is to visit every national park before turning 30.",
      images: [
        "/girl-profiles/zara-profile.png",
        "/girl-profiles/zara-profile-2.png",
        "/girl-profiles/zara-profile-3.png",
      ],
      interests: ["Travel", "Outdoors", "Photography"],
      location: "Denver",
    },
  ];

  return NextResponse.json({ profiles });
}