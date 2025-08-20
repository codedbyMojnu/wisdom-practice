import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getUserInfo, updateUserInfo } from "../utils/fireStoreDB";
import { useAuthData } from "./AuthContext";

const ProfileContext = createContext();

export default function ProfileProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const { authData } = useAuthData();

  // Fetch user profile data
  const fetchUserProfile = useCallback(async (uid) => {
    if (!uid) return;

    setLoading(true);
    setError(null);

    try {
      const response = await getUserInfo(uid);
      if (response) {
        setUserInfo(response);
      }
    } catch (error) {
      setError("Error happened when profile data loaded");
      console.error("Profile fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Refresh profile data (useful for manual refresh)
  const refreshProfile = useCallback(async () => {
    if (authData?.user?.uid) {
      await fetchUserProfile(authData.user.uid);
    }
  }, [authData?.user?.uid, fetchUserProfile]);

  // Update user profile data
  const updateUserProfile = useCallback(async (uid, updatedData) => {
    if (!uid) return false;

    setLoading(true);
    setError(null);

    try {
      await updateUserInfo(uid, updatedData);
      setUserInfo(updatedData);
      return true;
    } catch (error) {
      setError("Error updating profile data");
      console.error("Profile update error:", error);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Clear profile data (useful for logout)
  const clearProfileData = useCallback(() => {
    setUserInfo(null);
    setError(null);
    setLoading(false);
    setIsInitialized(false);
  }, []);

  // Initialize profile data when auth changes
  useEffect(() => {
    if (authData?.user?.uid && !isInitialized) {
      fetchUserProfile(authData.user.uid);
      setIsInitialized(true);
    } else if (!authData?.user?.uid) {
      clearProfileData();
    }
  }, [authData?.user?.uid, isInitialized, fetchUserProfile, clearProfileData]);

  // Auto-refresh profile data when user info changes in auth context
  useEffect(() => {
    if (authData?.user?.uid && isInitialized && userInfo) {
      // Check if the user info in auth context has changed
      if (
        userInfo.email !== authData.user.email ||
        userInfo.displayName !== authData.user.displayName
      ) {
        refreshProfile();
      }
    }
  }, [
    authData?.user?.email,
    authData?.user?.displayName,
    userInfo,
    isInitialized,
    refreshProfile,
  ]);

  const value = {
    userInfo,
    loading,
    error,
    isInitialized,
    fetchUserProfile,
    updateUserProfile,
    clearProfileData,
    refreshProfile,
    setUserInfo, // For direct state updates if needed
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}
