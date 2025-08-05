import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex">
      <LeftSidebar />
      <div className="flex-1">
        <Outlet /> {/* 👈 this is where nested routes render */}
      </div>
      <RightSidebar />
    </div>
  );
};

export default MainLayout;
