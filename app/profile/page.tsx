"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import app from "@/lib/firebase";
import { saveUserProfile, uploadProfileImage, getUserProfile } from "@/lib/userProfile";
import { User } from "firebase/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define proper types for the profile
interface UserProfile {
  displayName?: string;
  bio?: string;
  age?: string;
  interests?: string;
  location?: string;
  userId: string;
  email?: string;
  photoURL?: string;
  lastUpdated?: {
    seconds: number;
    nanoseconds: number;
  };
  provider?: string;
}

interface FormData {
  displayName: string;
  bio: string;
  age: string;
  interests: string;
  location: string;
}

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(false);
  const [saving, setSaving] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
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
        setAuthError(false);
        console.log("User authenticated:", currentUser);
        
        try {
          const userProfile = await getUserProfile(currentUser.uid);
          setProfile(userProfile as UserProfile);
          
          if (userProfile) {
            setFormData({
              displayName: String(userProfile?.displayName || currentUser?.displayName || ''),
              bio: String(userProfile?.bio || ''),
              age: String(userProfile?.age || ''),
              interests: String(userProfile?.interests || ''),
              location: String(userProfile?.location || ''),
            });
            
            if (userProfile.photoURL) {
              if (typeof userProfile.photoURL === 'string') {
                setImagePreview(userProfile.photoURL);
              }
            } else if (currentUser.photoURL) {
              setImagePreview(currentUser.photoURL);
            }
          } else if (currentUser.displayName) {
            setFormData(prev => ({
              ...prev,
              displayName: currentUser.displayName || ''
            }));
            
            if (currentUser.photoURL) {
              setImagePreview(currentUser.photoURL);
            }
          }
        } catch (error) {
          console.error("Error loading profile:", error);
        }
      } else {
        // No user is authenticated
        setAuthError(true);
        // Wait briefly before redirecting so user sees error message
        setTimeout(() => {
          router.push('/sign-in');
        }, 2000);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignOut = async () => {
    const auth = getAuth(app);
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      setAuthError(true);
      return;
    }
    
    setSaving(true);
    try {
      const profileData = {
        ...formData,
        userId: user.uid,
        email: user.email || undefined,
        lastUpdated: new Date(),
        provider: user.providerData[0]?.providerId || 'unknown'
      };
      
      await saveUserProfile(user.uid, profileData);
      
      if (profileImage) {
        await uploadProfileImage(user.uid, profileImage);
      }
      
      // Update local profile state
      const updatedProfile = await getUserProfile(user.uid);
      setProfile(updatedProfile as UserProfile);
      
      alert("Profile saved successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // If authentication error, show error page
  if (authError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ivory-100 via-rose-50 to-earth-100">
        <Card className="p-8 max-w-md text-center">
          <div className="text-rose-600 text-5xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-earth-800 mb-4">Authentication Required</h2>
          <p className="text-earth-600 mb-6">
            You must be signed in to view your profile. Redirecting to sign-in page...
          </p>
          <Button 
            className="bg-rose-600 hover:bg-rose-700 text-white"
            onClick={() => router.push('/sign-in')}
          >
            Sign In Now
          </Button>
        </Card>
      </div>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ivory-100 via-rose-50 to-earth-100">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-600 mb-4"></div>
          <div className="text-2xl text-earth-800">Loading profile...</div>
        </div>
      </div>
    );
  }

  // Main profile content
  return (
    <div className="min-h-screen bg-gradient-to-br from-ivory-100 via-rose-50 to-earth-100">
      <main className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 shadow-lg mb-8">
            <div className="flex flex-col md:flex-row md:items-center mb-8">
              <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-8 flex flex-col items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 mb-2">
                  {user?.photoURL ? (
                    <Image 
                      src={user.photoURL} 
                      alt="Profile" 
                      width={128}
                      height={128}
                      className="object-cover w-full h-full"
                    />
                  ) : imagePreview ? (
                    <Image 
                      src={imagePreview} 
                      alt="Profile" 
                      width={128}
                      height={128}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-4xl text-gray-400">👤</div>
                  )}
                </div>
              </div>
              
              <div>
                <h1 className="text-3xl font-bold text-earth-800 mb-2">
                  {user?.displayName || profile?.displayName || user?.email || 'User Profile'}
                </h1>
                
                <div className="text-earth-600 mb-3">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {user?.email}
                  </div>
                </div>
                
                {profile?.bio && (
                  <p className="text-earth-700 italic border-l-2 border-earth-200 pl-3 py-1">
                    &quot;{profile.bio}&quot;
                  </p>
                )}
              </div>
            </div>
            
            <Tabs defaultValue="view">
              <TabsList className="mb-6">
                <TabsTrigger value="view">View Profile</TabsTrigger>
                <TabsTrigger value="edit">Edit Profile</TabsTrigger>
              </TabsList>
              
              <TabsContent value="view">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6 bg-rose-50">
                    <h3 className="text-xl font-semibold text-earth-800 mb-3">Profile Info</h3>
                    
                    <div className="space-y-3">
                      <div>
                        <span className="font-medium text-earth-700">Display Name: </span>
                        <span>{profile?.displayName || user?.displayName || 'Not set'}</span>
                      </div>
                      
                      <div>
                        <span className="font-medium text-earth-700">Age: </span>
                        <span>{profile?.age || 'Not set'}</span>
                      </div>
                      
                      <div>
                        <span className="font-medium text-earth-700">Location: </span>
                        <span>{profile?.location || 'Not set'}</span>
                      </div>
                      
                      <div>
                        <span className="font-medium text-earth-700">Interests: </span>
                        <span>{profile?.interests || 'Not set'}</span>
                      </div>
                      
                      <div>
                        <span className="font-medium text-earth-700">Bio: </span>
                        <p className="mt-1">{profile?.bio || 'Not set'}</p>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-6 bg-earth-50">
                    <h3 className="text-xl font-semibold text-earth-800 mb-3">Account Info</h3>
                    
                    <div className="space-y-3">
                      <div>
                        <span className="font-medium text-earth-700">User ID: </span>
                        <span className="break-all text-sm text-earth-600">{user?.uid}</span>
                      </div>
                      
                      <div>
                        <span className="font-medium text-earth-700">Account Provider: </span>
                        <span>{user?.providerData?.[0]?.providerId || 'Unknown'}</span>
                      </div>
                      
                      <div>
                        <span className="font-medium text-earth-700">Last Updated: </span>
                        <span>{profile?.lastUpdated ? new Date(profile.lastUpdated.seconds * 1000).toLocaleDateString() : 'Never'}</span>
                      </div>
                    </div>
                  </Card>
                </div>
                
                <div className="mt-8 flex justify-center">
                  <Button 
                    className="bg-rose-600 hover:bg-rose-700 text-white"
                    onClick={() => router.push('/swipe')}
                  >
                    Start Swiping
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="edit">
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
                        {saving ? 'Saving...' : 'Save Profile'}
                      </Button>
                    </div>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </Card>
          
          <div className="flex justify-center">
            <Button 
              onClick={handleSignOut}
              variant="outline"
              className="border-rose-300 text-rose-700 hover:bg-rose-50"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}