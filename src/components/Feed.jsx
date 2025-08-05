import React from 'react'
import Posts from './Posts'

const Feed = () => {
  return (
    <div className='flex-1 my-8 flex flex-col items-center pl-[20%] pr-[20%]'>
        <p className="text-sm text-black italic mb-4">
  This is the desktop version & Some features are not working here .
</p>

        <Posts/>
    </div>
  )
}

export default Feed