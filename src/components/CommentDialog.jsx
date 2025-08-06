import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { useSelector, useDispatch } from "react-redux";
import Comment from "./Comment";

import { toast, Toaster } from "sonner";
import axiosInstance from "@/lib/axiosInstance";
// import { setAllPosts } from "../redux/postSlice"; // make sure the path is correct

// import { send } from "vite";

const CommentDialog = ({ open, setOpen }) => {
  const [text, setText] = useState("");
  const { selectedPost, posts } = useSelector((store) => store.post);
  const [comment, setComment] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedPost) {
      setComment(selectedPost.comments);
    }
  }, [selectedPost]);

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };

  const sendMessageHandler = async () => {
    if (!selectedPost?._id) {
      console.warn("Post ID is missing. Aborting comment submission.");
      toast.error("Post is not loaded yet.");
      return;
    }

    try {
      const res = await axiosInstance.post(
        `/api/v1/post/${selectedPost._id}/comment`,
        { text },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        const updatedCommentData = [...comment, res.data.comment];
        setComment(updatedCommentData);

        const updatedPostList = posts.map((p) =>
          p._id === selectedPost._id
            ? { ...p, comments: updatedCommentData }
            : p
        );
        //  dispatch(setAllPosts(updatedPostList));

        toast.success(res.data.message);
        setText("");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to comment.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        onInteractOutside={() => setOpen(false)}
        className="max-w-5xl p-0 flex flex-col [&>button]:hidden"
      >
        <div className="flex flex-1 ">
          {/* Left: Image */}
          <div className="w-1/2">
            <img
              src={selectedPost?.image}
              className="w-full h-full object-cover rounded-l-lg"
              alt="post_img"
            />
          </div>

          {/* Right: Content */}
          <div className="w-1/2 flex flex-col justify-between">
            {/* Top Bar */}
            <div className="flex items-center justify-between p-4">
              <div className="flex gap-3 items-center">
                <Link to={`/profile/${selectedPost?.author?._id}`}>
                  <Avatar>
                    <AvatarImage src={selectedPost?.author?.profilePicture} />
                    <AvatarFallback>
                      {selectedPost?.author?.username?.[0]?.toUpperCase() ||
                        "?"}
                    </AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <Link className="font-semibold text-sm">
                    {selectedPost?.author?.username}
                  </Link>
                </div>
              </div>

              {/* More Options Dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <MoreHorizontal className="cursor-pointer" />
                </DialogTrigger>
                <DialogContent className="flex flex-col items-center text-sm text-center [&>button]:hidden">
                  <div className="cursor-pointer w-full text-[#ED4956]">
                    Unfollow
                  </div>
                  <div className="cursor-pointer w-full">Add to favourites</div>
                </DialogContent>
              </Dialog>
            </div>

            <hr />

            {/* Comments Section */}
            <div className="flex-1 overflow-y-auto max-h-96 p-4">
              {
              comment.map((comment) => (
                <Comment key={comment._id} comment={comment} />
              ))}
            </div>

            {/* Comment Input */}
            <div className="p-4  ">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Add a comment ..."
                  onChange={changeEventHandler}
                  value={text}
                  className="w-full outline-none border text-sm border-gray-300 p-2 rounded"
                />
                <Button
                  disabled={!text.trim()}
                  onClick={sendMessageHandler}
                  variant="outline"
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
