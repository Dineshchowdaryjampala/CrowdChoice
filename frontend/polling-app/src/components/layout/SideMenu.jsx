import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const SideMenu = ({ activeMenu }) => {
  const { clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-gray-900/90 backdrop-blur-lg shadow-xl border-r border-gray-700 p-5 sticky top-[61px] z-20 rounded-r-lg">
      {SIDE_MENU_DATA.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] text-gray-300 hover:text-white py-3 px-6 rounded-full transition-all duration-300 ${
            activeMenu === item.label ? "bg-blue-700 text-white shadow-md" : "hover:bg-gray-800"
          }`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-2xl" /> {item.label}
        </button>
      ))}

      {/* Logout Button */}
      {/*
      <button
        className="w-full flex items-center gap-4 text-[15px] text-red-400 hover:text-white py-3 px-6 mt-5 rounded-full transition-all duration-300 hover:bg-red-600"
        onClick={handleLogout}
      >
        🚪 Logout
      </button>
      */}
      
    </div>
  );
};

export default SideMenu;
