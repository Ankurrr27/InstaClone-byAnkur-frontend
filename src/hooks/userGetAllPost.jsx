import { setPosts } from "@/redux/postSlice";
import axiosInstance from "@/lib/axiosInstance";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllPost = () => {
  const dispatch = useDispatch();

  const fetchAllPost = async () => {
    try {
      const res = await axiosInstance.get("/post/all");
      if (res.data.success) {
        dispatch(setPosts(res.data.posts));
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error.message);
    }
  };

  useEffect(() => {
    fetchAllPost();
  }, [dispatch]);

  return { fetchAllPost }; // <- this is the key
};

export default useGetAllPost;
