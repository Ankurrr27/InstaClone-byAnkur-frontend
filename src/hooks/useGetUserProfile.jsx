import { setUserProfile } from "@/redux/authSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetUserProfile = (userId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userId) {
      console.warn("⚠️ No userId provided to useGetUserProfile hook.");
      return;
    }

    const fetchUserProfile = async () => {
      try {
        console.log("📤 Fetching profile for userId:", userId);
        const res = await axios.get(
          `https://instaclone-byankur-backend.onrender.com/user/${userId}/profile`,
          { withCredentials: true }
        );

        console.log("📥 API Response:", res.data);

        if (res.data.success) {
          dispatch(setUserProfile(res.data.user));
          console.log("✅ Dispatched user profile to Redux store");
        } else {
          console.warn("❌ API success false:", res.data.message);
        }
      } catch (error) {
        console.error(
          "🚨 Error fetching user profile:",
          error?.response?.data || error.message
        );
      }
    };

    fetchUserProfile();
  }, [userId, dispatch]);
};

export default useGetUserProfile;
