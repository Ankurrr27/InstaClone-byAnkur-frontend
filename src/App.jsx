import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import MainLayout from "./components/MainLayout";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Home from "./components/Home";
import EditProfile from "./components/EditProfile";
import ChatPage from "./components/ChatPage";

import { setOnlineUsers } from "./redux/chatSlice"
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createContext, useContext } from "react";
import { setLikeNotification } from "./redux/rtnSlice";
import ProtectedRoutes from "./components/ProtectedRoutes";



export const SocketContext = createContext(null);
export const useSocket = () => useContext(SocketContext);


const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes><MainLayout /></ProtectedRoutes> ,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile/:id",
        element:<Profile />,
      },
      {
        path: "/account/edit",
        element:<EditProfile /> ,
      },
      {
        path: "/chat",
        element:<ChatPage /> ,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);
function App() {
  const { user } = useSelector((store) => store.auth);
  const [ socket , setSocket ] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const socketio = io(import.meta.env.VITE_API_BASE_URL, {
        query: {
          userId: user?._id,
        },
        transports: ["websocket"],
      });
   
  setSocket(socketio);
      // listening all the event
      socketio.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      socketio.on('notification' , (notification)=>{
        dispatch(setLikeNotification(notification));
      })

      return () => {
        socketio.close();
       setSocket(null);
      };
    } else if (socket){
      socket?.close();
    setSocket(null);
    }
  }, [user, dispatch]);

  return (
    <>

     
      <RouterProvider router={browserRouter} />
  
    </>
  );
}

export default App;
