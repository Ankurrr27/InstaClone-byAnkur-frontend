import { setSuggestedUsers } from "@/redux/authSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetSuggestedUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/user/suggestedUser", {
          withCredentials: true,
        });

        console.log(" API response:", res.data); 

        if (res.data.success && Array.isArray(res.data.users)) {
          console.log(" Dispatching users:", res.data.users);
          dispatch(setSuggestedUsers(res.data.users));
        } else {
          console.warn(" API returned success = false or users not an array");
        }
      } catch (error) {
        console.error(" Axios fetch failed:", error);
      }
    };

    fetchSuggestedUsers();
  }, [dispatch]); 
};

export default useGetSuggestedUsers;
