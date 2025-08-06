import { setPosts } from "@/redux/postSlice";
import axiosInstance from "@/lib/axiosInstance"; // ✅ using custom axios
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllPost = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllPost = async () => {
      try {
        const res = await axiosInstance.get("/post/all"); // ✅ no full URL
        if (res.data.success) {
          console.log("Fetched posts:", res.data.posts); // ✅ only after res
          dispatch(setPosts(res.data.posts));
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error.message);
      }
    };

    fetchAllPost();
  }, [dispatch]);
};

export default useGetAllPost;
