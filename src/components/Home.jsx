import React from 'react';
import Feed from './Feed';
import { Outlet } from 'react-router-dom';
import RightSidebar from './RightSidebar';
import useGetAllPost from '../hooks/userGetAllPost';
import useGetSuggestedUsers from '@/hooks/useGetSuggestedUsers';

const Home = () => {
    useGetAllPost();
    useGetSuggestedUsers();

    return (
        <div className="flex h-screen overflow-hidden">
            <div className="flex-grow overflow-y-scroll">
                <Feed />
                <Outlet />
            </div>
            <div className="w-[300px] overflow-y-scroll h-screen">
                <RightSidebar />
            </div>
        </div>
    );
};

export default Home;
