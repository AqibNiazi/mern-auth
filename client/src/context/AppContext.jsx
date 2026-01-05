import { createContext, useState, useEffect } from "react";
import { clientBaseURL, clientEndPoints } from "../config";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUserData = async () => {
    try {
      const res = await clientBaseURL.get(clientEndPoints.userData);

      if (res.status === 200 && res.data.success) {
        setUserData(res.data.userData);
      }
    } catch (error) {
      // silent fail (user probably logged out)
      console.error("Failed to fetch user data:", error);
      setUserData(null);
    }
  };

  const getAuthState = async () => {
    try {
      const res = await clientBaseURL.post(clientEndPoints.isAuthenticated);

      if (res.status === 200 && res.data.success) {
        setIsLoggedIn(true);
        await getUserData();
      }
    } catch (error) {
      if (error.response?.status === 401) {
        // Unauthorized → expected case
        setIsLoggedIn(false);
        setUserData(null);
      } else {
        console.error("Auth check failed:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  const value = {
    isLoggedIn,
    userData,
    loading,
    setIsLoggedIn,
    setUserData,
    getAuthState,
    getUserData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
