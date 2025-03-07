import { getFirestore, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth, updateProfile } from 'firebase/auth';
import app from './firebase';

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

// Create or update user profile
interface UserProfile {
  userId: string;
  updatedAt: Date;
  createdAt?: Date;
  [key: string]: string | number | boolean | Date | undefined; // Allow additional properties
}

export const saveUserProfile = async (userId: string, profileData: Partial<UserProfile>): Promise<boolean> => {
  try {
    // Add timestamp and ensure userId is included
    const dataToSave: UserProfile = {
      ...profileData,
      updatedAt: new Date(),
      userId: userId,
      createdAt: profileData.createdAt || new Date() // Add creation date if it doesn't exist
    };
    
    console.log(`Saving profile to Firestore for user: ${userId}`);
    
    // Use setDoc with merge option to update existing or create new
    await setDoc(doc(db, 'users', userId), dataToSave, { merge: true });
    
    console.log("Profile saved successfully");
    return true;
  } catch (error) {
    console.error("Error saving user profile:", error);
    throw error;
  }
};

// Get user profile
export const getUserProfile = async (userId) => {
  try {
    console.log(`Fetching profile from Firestore for user: ${userId}`);
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log("Profile retrieved successfully");
      return data;
    } else {
      console.log("No profile found for this user");
      return null;
    }
  } catch (error) {
    console.error("Error getting user profile:", error);
    // Return null instead of throwing to prevent app crashes
    return null;
  }
};

// Upload profile image
export const uploadProfileImage = async (userId, file) => {
  try {
    const storageRef = ref(storage, `profile-images/${userId}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    
    // Update user profile with image URL
    await updateDoc(doc(db, 'users', userId), {
      photoURL: downloadURL,
      updatedAt: new Date()
    });
    
    // Also update auth profile
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        photoURL: downloadURL
      });
    }
    
    return downloadURL;
  } catch (error) {
    console.error("Error uploading profile image:", error);
    throw error;
  }
};
