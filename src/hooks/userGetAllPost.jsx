import { setPosts } from "@/redux/postSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


const useGetAllPost = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllPost = async () => {
            console.log("Fetched posts:", res.data); // should show array of posts

            try {
               console.log("Fetched posts:", res.data); // should show array of posts

                const res = await axios.get('https://instaclone-byankur-backend.onrender.com/api/v1/post/all', { withCredentials: true });
                if (res.data.success) { 
                    dispatch(setPosts(res.data.posts));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllPost();
    }, []);
};
export default useGetAllPost;