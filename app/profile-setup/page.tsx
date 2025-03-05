"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "@/lib/firebase";
import { saveUserProfile, uploadProfileImage, getUserProfile } from "@/lib/userProfile";

export default function ProfileSetup() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    displayName: '',
    bio: '',
    age: '',
    interests: '',
    location: '',
  });

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Show welcome message with Google ID
        alert(`Welcome, ${currentUser.displayName || currentUser.email}! (ID: ${currentUser.uid})`);
        
        // Pre-fill form with existing data if available
        try {
          const profile = await getUserProfile(currentUser.uid);
          if (profile) {
            setFormData({
              displayName: profile.displayName || currentUser.displayName || '',
              bio: profile.bio || '',
              age: profile.age || '',
              interests: profile.interests || '',
              location: profile.location || '',
            });
            if (profile.photoURL) {
              setImagePreview(profile.photoURL);
            } else if (currentUser.photoURL) {
              setImagePreview(currentUser.photoURL);
            }
          } else if (currentUser.displayName) {
            setFormData(prev => ({
              ...prev,
              displayName: currentUser.displayName
            }));
            if (currentUser.photoURL) {
              setImagePreview(currentUser.photoURL);
            }
          }
        } catch (error) {
          console.error("Error loading profile:", error);
        }
      } else {
        // Redirect to sign-in if not authenticated
        router.push('/sign-in');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    
    setSaving(true);
    try {
      // Save profile data
      await saveUserProfile(user.uid, formData);
      
      // Upload profile image if selected
      if (profileImage) {
        await uploadProfileImage(user.uid, profileImage);
      }
      
      // Redirect to start swiping
      router.push('/start-swiping');
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ivory-100 via-rose-50 to-earth-100">
        <div className="text-2xl text-earth-800">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-ivory-100 via-rose-50 to-earth-100">
      <main className="container mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-earth-800 mb-10 text-center">Set Up Your Profile</h1>
        
        {user && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 max-w-2xl mx-auto">
            <p className="font-bold">Welcome to Galatea.AI!</p>
            <p>User: {user.displayName || user.email}</p>
            <p className="text-sm">Google ID: {user.uid}</p>
          </div>
        )}
        
        <div className="max-w-2xl mx-auto">
          <Card className="p-6 shadow-lg">
            <form onSubmit={handleSubmit}>
              <div className="mb-8 flex flex-col items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 mb-4 relative">
                  {imagePreview ? (
                    <Image 
                      src={imagePreview} 
                      alt="Profile preview" 
                      fill 
                      style={{ objectFit: 'cover' }} 
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      No Image
                    </div>
                  )}
                </div>
                <label className="cursor-pointer bg-rose-500 hover:bg-rose-600 text-white py-2 px-4 rounded-md transition-colors">
                  Upload Photo
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageChange}
                  />
                </label>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-earth-700 mb-1">Display Name</label>
                  <input
                    type="text"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-earth-700 mb-1">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                    required
                    min="18"
                    max="120"
                  />
                </div>
                
                <div>
                  <label className="block text-earth-700 mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
                
                <div>
                  <label className="block text-earth-700 mb-1">Interests (comma separated)</label>
                  <input
                    type="text"
                    name="interests"
                    value={formData.interests}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                    placeholder="e.g. hiking, movies, cooking"
                  />
                </div>
                
                <div>
                  <label className="block text-earth-700 mb-1">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 min-h-[100px]"
                    placeholder="Tell us about yourself..."
                    required
                  />
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button 
                    type="submit" 
                    disabled={saving}
                    className="bg-earth-700 hover:bg-earth-800 text-white"
                  >
                    {saving ? 'Saving...' : 'Save Profile & Continue'}
                  </Button>
                </div>
              </div>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
}
