import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Bookmark, MessageCircle, MoreHorizontal, Send } from "lucide-react";
import { Button } from "./ui/button";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommentDialog from "./CommentDialog";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "sonner";
import { setPosts, setSelectedPost } from "@/redux/postSlice";
import { Badge } from "./ui/badge";

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const posts = useSelector((state) => state.post.posts);

  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [liked, setLiked] = useState(post.likes.includes(user?._id) || false);
  const [postLike, setPostLike] = useState(post.likes.length);
  const [comment, setComment] = useState(post.comments);

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };

  const likeOrDislikeHandler = async () => {
    try {
      const action = liked ? "dislike" : "like";
      const res = await axiosInstance.get(
        `/post/${post._id}/${action}`,
        
      );

      if (res.data.success) {
        const updatedLikes = liked ? postLike - 1 : postLike + 1;
        setPostLike(updatedLikes);
        setLiked(!liked);

        const updatedPostData = posts.map((p) =>
          p._id === post._id
            ? {
                ...p,
                likes: liked
                  ? p.likes.filter((id) => id !== user._id)
                  : [...p.likes, user._id],
              }
            : p
        );
        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const commentHandler = async () => {
    try {
      const res = await axiosInstance.post(
        `/post/${post._id}/comment`,
        { text },
        {
          headers: { "Content-Type": "application/json" },
         
        }
      );
      console.log(res.data);

      if (res.data.success) {
        const updatedCommentData = [...comment, res.data.comment];
        setComment(updatedCommentData);

        const updatedPostData = posts.map((p) =>
          p._id === post._id ? { ...p, comments: updatedCommentData } : p
        );
        dispatch(setPosts(updatedPostData));

        toast.success(res.data.message);
        setText("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deletePostHandler = async () => {
    try {
      const res = await axiosInstance.delete(
        `/post/delete/${post?._id}`,
        
      );

      if (res.data.success) {
        const updatedPostData = posts.filter(
          (postItem) => postItem?._id !== post?._id
        );

        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="my-8 w-full max-w-sm mx-auto">
      {/* Topbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={post.author?.profilePicture} alt="avatar" />
            <AvatarFallback>
              {post.author?.username?.[0]?.toUpperCase() || "?"}
            </AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-2">
            <h1>{post.author?.username}</h1>
            {user?._id === post.author._id && <Badge variant="secondary" className="bg-gray-100 mb-0 pb-0">Author</Badge>}
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <MoreHorizontal className="cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center text-sm text-center">
            <Button variant="ghost" className="w-fit text-[#ED4956] font-bold">
              Unfollow
            </Button>
            <Button variant="ghost" className="w-fit">
              Add to favourites
            </Button>
            {user?._id === post.author?._id && (
              <Button
                onClick={deletePostHandler}
                variant="ghost"
                className="w-fit"
              >
                Delete
              </Button>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Image */}
      <img
        src={post.image}
        alt="post_img"
        className="rounded-sm my-2 w-full aspect-square object-cover"
      />

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {liked ? (
            <FaHeart
              size={24}
              className="cursor-pointer text-red-600"
              onClick={likeOrDislikeHandler}
            />
          ) : (
            <FaRegHeart
              size={24}
              className="cursor-pointer"
              onClick={likeOrDislikeHandler}
            />
          )}

          <MessageCircle
            size={24}
            className="cursor-pointer hover:text-gray-500"
            onClick={() => {
              dispatch(setSelectedPost(post));
              setOpen(true);
            }}
          />

          <Send className="cursor-pointer hover:text-gray-500" />
        </div>
        <Bookmark className="cursor-pointer hover:text-gray-500" />
      </div>

      {/* Meta */}
      <span className="text-sm block mb-2">{postLike} likes</span>
      <p>
        <span className="font-medium mr-2">{post.author?.username}</span>
        {post.caption}
      </p>
      {comment.length > 0 && (
        <span
          onClick={() => {
            dispatch(setSelectedPost(post));
            setOpen(true);
          }}
          className="cursor-pointer text-sm text-gray-400"
        >
          View all {comment.length} comments
        </span>
      )}

      <CommentDialog open={open} setOpen={setOpen} />

      {/* Add Comment */}
      <div className="flex items-center justify-between">
        <input
          type="text"
          name="comment"
          placeholder="Add a comment..."
          value={text}
          onChange={changeEventHandler}
          className="outline-none text-sm w-full"
        />
        {text && (
          <span
            onClick={commentHandler}
            className="text-[#3BADF8] cursor-pointer"
          >
            Post
          </span>
        )}
      </div>
    </div>
  );
};

export default Post;
