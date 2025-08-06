import { setUserProfile } from "@/redux/authSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useGetUserProfile = (userId) => {
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(
          `https://instaclone-byankur-backend.onrender.com/user/${userId}/profile`,
          { withCredentials: true }
        );
        if (res.data.success) {
          setUserProfile(res.data.user);
          dispatch(setUserProfile(res.data.user));
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchUserProfile();
  }, [userId, dispatch]);

  return userProfile;
};

export default useGetUserProfile;
