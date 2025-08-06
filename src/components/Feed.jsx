import React from "react";
import Posts from "./Posts";

const Feed = () => {
  return (
    <div className="flex-1 my-8 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <p className="text-sm text-black italic mb-4 text-center">
          This is the desktop version & Some features are not working here.
        </p>
        <Posts />
      </div>
    </div>
  );
};

export default Feed;
