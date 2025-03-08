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
    {
      id: "4",
      name: "Sophia",
      age: 27,
      bio: "Professional dancer and yoga instructor. I believe in living mindfully and finding balance in life. Love hiking and being outdoors whenever possible.",
      images: [
        "/girl-profiles/sophia-profile.png", 
        "/girl-profiles/sophia-profile-2.png",
        "/girl-profiles/sophia-profile-3.png"
      ],
      interests: ["Yoga", "Dance", "Hiking", "Meditation"],
      location: "Los Angeles",
    },
    {
      id: "5",
      name: "Emma",
      age: 24,
      bio: "Software engineer by day, amateur chef by night. I enjoy coding challenges almost as much as I enjoy trying out new recipes. Looking for someone to share my culinary experiments with!",
      images: [
        "/girl-profiles/emma-profile.png", 
        "/girl-profiles/emma-profile-2.png", 
        "/girl-profiles/emma-profile-3.png"
      ],
      interests: ["Cooking", "Technology", "Reading", "Travel"],
      location: "San Francisco",
    },
    {
      id: "6",
      name: "Olivia",
      age: 26,
      bio: "Marine biologist with a passion for ocean conservation. I spend most weekends either at the beach or volunteering at local clean-up events. Looking for someone who appreciates nature as much as I do.",
      images: [
        "/girl-profiles/olivia-profile.png", 
        "/girl-profiles/olivia-profile-2.png", 
      ],
      interests: ["Ocean Conservation", "Scuba Diving", "Environmental Science"],
      location: "San Diego",
    },
    {
      id: "7",
      name: "Isabella",
      age: 28,
      bio: "Concert pianist and music teacher. When I'm not practicing or performing, I'm probably at a live music venue or exploring vintage record stores. Music is my language of love.",
      images: [
        "/girl-profiles/isabella-profile.png", 
        "/girl-profiles/isabella-profile-2.png",
      ],
      interests: ["Classical Music", "Jazz", "Teaching", "Piano"],
      location: "Boston",
    }
  ];

  return NextResponse.json({ profiles });
}