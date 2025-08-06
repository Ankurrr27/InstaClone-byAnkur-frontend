import { setUserProfile } from "@/redux/authSlice";
import axiosInstance from "@/lib/axiosInstance"; // use your custom axios setup
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetUserProfile = (userId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axiosInstance.get(`/user/${userId}/profile`);
        if (res.data.success) {
          dispatch(setUserProfile(res.data.user));
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    if (userId) {
      fetchUserProfile();
    }
  }, [userId, dispatch]);
};

export default useGetUserProfile;
