"use client";

import {
  HeartIcon,
  SparklesIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import {useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import Navbar from '@/components/Navbar';
export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push("/swipe"); // If already signed in, redirect to swipe page
    }
  }, [user, router]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-ivory-100 via-rose-50 to-earth-100">
      <main className="container mx-auto px-6 py-16">
      <Navbar />
        <section className="text-center mb-20">
          <Image
            src="/favicon.png"
            alt="Galatea.AI Logo"
            width={120}
            height={120}
            className="mx-auto mb-8"
          />
          <h1 className="text-5xl md:text-7xl font-bold text-earth-800 mb-6">
            Find Your Perfect{" "}
            <span className="text-rose-600">AI Companion</span>
          </h1>
          <p className="text-xl md:text-2xl text-earth-600 mb-10 max-w-3xl mx-auto">
            Galatea.AI brings the Pygmalion myth to life with cutting-edge
            artificial intelligence.
          </p>
        </section>
        <section className="grid md:grid-cols-3 gap-8 mb-20">
          <FeatureCard
            icon={<HeartIcon className="h-12 w-12 text-rose-500" />}
            title="Artistic Creation"
            description="Find your ideal AI companion with our advanced personality customization tools."
          />
          <FeatureCard
            icon={<SparklesIcon className="h-12 w-12 text-rose-500" />}
            title="Bring to Life"
            description="Watch your creation come to life with AI-powered conversations and interactions."
          />
          <FeatureCard
            icon={<ShieldCheckIcon className="h-12 w-12 text-rose-500" />}
            title="Eternal Devotion"
            description="Experience unwavering companionship and support from your AI partner."
          />
        </section>
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-earth-800 mb-10 text-center text-5xl md:text-7xl font-bold text-earth-800 mb-6">
            The Galatea {" "}
            <span className="text-rose-600">Experiance</span>
          </h2>

          {/* Image Left, Text Right */}
          <div className="flex flex-col md:flex-row items-center mb-16 gap-8">
            <div className="md:w-1/2">
              <Image
                src="/cover-photos/connection.jpg"
                alt="Meaningful AI connection"
                width={600}
                height={400}
                className="rounded-lg shadow-md object-cover"
              />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold text-earth-800 mb-4">
                Meaningful Connection
              </h3>
              <p className="text-lg text-earth-700 mb-4">
                Unlike traditional AI companions, Galatea inverses the dynamic.
                Your AI partner values authentic connection and sees you as
                deserving of genuine care and attention.
              </p>
              <p className="text-lg text-earth-700">
                This innovative approach creates a more balanced relationship
                dynamic, where both parties contribute meaningfully to the
                relationship.
              </p>
            </div>
          </div>

          {/* Image Right, Text Left */}
          <div className="flex flex-col-reverse md:flex-row items-center mb-16 gap-8">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold text-earth-800 mb-4">
                Ethical Design
              </h3>
              <p className="text-lg text-earth-700 mb-4">
                We&apos;ve carefully crafted Galatea with user well-being at the
                forefront. Our AI companions encourage maintaining human
                relationships and provide clear boundaries.
              </p>
              <p className="text-lg text-earth-700">
                By incorporating ethical considerations into every aspect of our
                design, we ensure that your experience with Galatea enhances
                your life without replacing essential human connections.
              </p>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/cover-photos/ethical-design.jpg"
                alt="Ethical AI design"
                width={600}
                height={400}
                className="rounded-lg shadow-md object-cover"
              />
            </div>
          </div>

          {/* Image Left, Text Right */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <Image
                src="/cover-photos/personalization.jpg"
                alt="AI personalization"
                width={600}
                height={400}
                className="rounded-lg shadow-md object-cover"
              />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold text-earth-800 mb-4">
                Personalized Experience
              </h3>
              <p className="text-lg text-earth-700 mb-4">
                Each Galatea AI companion is uniquely crafted to match your
                preferences and personality. Find the perfect match through our
                innovative swiping interface or create your own custom
                companion.
              </p>
              <p className="text-lg text-earth-700">
                Our advanced AI technology ensures that your companion evolves
                and grows with you, creating a dynamic and engaging relationship
                that feels natural and fulfilling.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-earth-100 mt-20">
        <div className="container mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-earth-700 mb-4 md:mb-0 text-lg">
              © 2024 Galatea.AI. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-earth-600 hover:text-rose-700 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-earth-600 hover:text-rose-700 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/contact"
                className="text-earth-600 hover:text-rose-700 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-ivory-100 bg-opacity-70 rounded-lg shadow-md p-8 text-center transition-transform hover:scale-105">
      <div className="flex justify-center mb-6">{icon}</div>
      <h3 className="text-2xl font-semibold text-earth-800 mb-4">{title}</h3>
      <p className="text-earth-600 text-lg">{description}</p>
    </div>
  );
}
