import React, { useContext } from "react";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import UserDetailsCard from "../cards/UserDetailsCard";
import { UserContext } from "../../context/UserContext";
import TreadingPolls from "./TreadingPolls";
import Footer from "./Footer";

const DashboardLayout = ({ children, activeMenu, stats, showStats }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Sticky Navbar with Elegant Dark Theme */}
      <div className="fixed top-0 left-0 w-full z-50 shadow-md bg-gray-900/90 backdrop-blur-lg text-white border-b border-gray-700">
        <Navbar activeMenu={activeMenu} />
      </div>

      {user && (
        <div className="flex flex-1 flex-wrap p-4 gap-4 mt-16">
          {/* Sidebar with Glassmorphism Effect */}
          <div className="hidden lg:block w-1/5 bg-gray-900/80 backdrop-blur-md shadow-lg rounded-lg p-4 sticky top-16 h-screen overflow-y-auto border border-gray-700 text-white">
            <SideMenu activeMenu={activeMenu} />
          </div>

          {/* Main Content Area with Card-Like Appearance */}
          <div className="flex-grow bg-gray-900/90 shadow-xl rounded-lg p-6 border border-gray-700 text-white">
            {children}
          </div>

          {/* User Info & Trending Polls Section */}
          <div className="hidden md:block w-1/4 space-y-4">
            <div className="bg-gray-900/80 backdrop-blur-lg shadow-lg rounded-lg p-4 border border-gray-700">
              <UserDetailsCard
                profileImageUrl={user.profileImageUrl}
                fullname={user.fullName}
                username={user.username}
                totalPollsVotes={user.totalPollsVotes}
                totalPollsCreated={user.totalPollsCreated}
                totalPollsBookmarked={user.totalPollsBookmarked}
              />
            </div>

            {showStats && stats?.length > 0 && (
              <div className="bg-gray-900/80 backdrop-blur-lg shadow-lg rounded-lg p-4 border border-gray-700">
                <TreadingPolls stats={stats} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DashboardLayout;
