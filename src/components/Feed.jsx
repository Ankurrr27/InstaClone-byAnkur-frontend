import React from "react";
import Posts from "./Posts";

const Feed = () => {
  return (
    <div className="flex-1 my-8 flex flex-col items-center pr-12">
      <div className="w-full max-w-2xl">
        <p className="text-sm text-black italic mb-4 text-center">
         This is the desktop version & some features might not work properly.
         Also, avoid refreshing the page while testing — it may lose connection
        </p>
        <Posts />
      </div>
    </div>
  );
};

export default Feed;
