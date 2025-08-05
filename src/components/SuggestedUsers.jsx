import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import useGetSuggestedUsers from '@/hooks/useGetSuggestedUsers';

const SuggestedUsers = () => {
  useGetSuggestedUsers();

  const { suggestedUsers = [] } = useSelector((store) => store.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  if (suggestedUsers.length > 0 || Array.isArray(suggestedUsers)) {
    setLoading(false);
  }
}, [suggestedUsers]);

  return (
    <div className='my-10 '>
      <div className='flex flex-col gap-1 text-sm'>
        <div className='flex items-center justify-between'>
          <h1 className='font-semibold text-gray-600'>Suggested for you</h1>
          <span className='font-medium cursor-pointer'>See All</span>
        </div>
        <p className="text-xs text-gray-400 italic">
          {loading ? "Finding the best folks for you..." :
            suggestedUsers.length > 0
              ? "People you might vibe with 🔗"
              : "No one to suggest... yet "}
        </p>
      </div>

      {loading ? (
        <p className="text-xs text-gray-400 mt-4">Fetching suggestions...</p>
      ) : suggestedUsers.length > 0 ? (
        suggestedUsers.map((user) => (
          <div key={user._id} className='flex items-center justify-between my-5'>
            <div className='flex items-center gap-2'>
              <Link to={`/profile/${user?._id}`}>
                <Avatar>
                  <AvatarImage src={user?.profilePicture} alt={user?.username || 'User'} />
                  <AvatarFallback>{user?.username?.[0]?.toUpperCase() || "U"}</AvatarFallback>
                </Avatar>
              </Link>
              <div>
                <h1 className='font-semibold text-sm'>
                  <Link to={`/profile/${user?._id}`}>{user?.username}</Link>
                </h1>
                <span className='text-gray-600 text-sm'>{user?.bio || 'No bio yet'}</span>
              </div>
            </div>
            <span className='text-[#3BADF8] text-xs font-bold cursor-pointer hover:text-[#3495d6]'>
              Follow
            </span>
          </div>
        ))
      ) : null}
    </div>
  );
};

export default SuggestedUsers;
