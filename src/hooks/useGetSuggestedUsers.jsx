import { setSuggestedUsers } from "@/redux/authSlice";
import axiosInstance from "@/lib/axiosInstance";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetSuggestedUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      try {
        const res = await axiosInstance.get("/user/suggestedUser");

        console.log("API response:", res.data); 

        if (res.data.success && Array.isArray(res.data.users)) {
          console.log("Dispatching users:", res.data.users);
          dispatch(setSuggestedUsers(res.data.users));
        } else {
          console.warn("API returned success = false or users not an array");
        }
      } catch (error) {
        console.error("Axios fetch failed:", error);
      }
    };

    fetchSuggestedUsers();
  }, [dispatch]);
};

export default useGetSuggestedUsers;
