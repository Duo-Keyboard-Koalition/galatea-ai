import { getFirestore } from 'firebase/firestore';
import app from './firebase';

// Initialize Firestore
const db = getFirestore(app);
console.log("Firestore initialized in matchService");
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  doc, 
  updateDoc, 
  arrayUnion, 
  getDoc, 
  serverTimestamp 
} from 'firebase/firestore';

// Record a user's swipe action
export const recordSwipe = async (userId, profileId, direction) => {
  try {
    await addDoc(collection(db, 'swipes'), {
      userId,
      profileId,
      direction, // 'left' or 'right'
      timestamp: serverTimestamp()
    });
    
    // If it's a right swipe, check for a match
    if (direction === 'right') {
      await checkForMatch(userId, profileId);
    }
    
    return true;
  } catch (error) {
    console.error("Error recording swipe:", error);
    throw error;
  }
};

// Check if there's a match (AI profiles always match with users)
const checkForMatch = async (userId, profileId) => {
  try {
    // For AI profiles, automatically create a match
    const matchRef = await addDoc(collection(db, 'matches'), {
      userId,
      profileId,
      createdAt: serverTimestamp(),
      lastInteraction: serverTimestamp()
    });
    
    // Update user's matches array
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      matches: arrayUnion(matchRef.id)
    });
    
    return matchRef.id;
  } catch (error) {
    console.error("Error creating match:", error);
    throw error;
  }
};

// Get all matches for a user
export const getUserMatches = async (userId) => {
  try {
    const matchesQuery = query(
      collection(db, 'matches'),
      where('userId', '==', userId)
    );
    
    const matchesSnapshot = await getDocs(matchesQuery);
    const matches = [];
    
    for (const matchDoc of matchesSnapshot.docs) {
      const matchData = matchDoc.data();
      
      // Get profile details
      const profileResponse = await fetch(`/api/profiles?id=${matchData.profileId}`);
      const profileData = await profileResponse.json();
      
      matches.push({
        id: matchDoc.id,
        profile: profileData,
        createdAt: matchData.createdAt?.toDate() || new Date(),
        lastInteraction: matchData.lastInteraction?.toDate() || new Date()
      });
    }
    
    return matches;
  } catch (error) {
    console.error("Error getting matches:", error);
    throw error;
  }
};
