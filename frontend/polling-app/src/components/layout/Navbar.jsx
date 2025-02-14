import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className="flex items-center justify-between p-4 sticky top-0 z-30 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 backdrop-blur-lg shadow-md border-b border-gray-700">
      {/* Mobile Menu Button */}
      <button
        className="block lg:hidden text-white transition-transform duration-300 ease-in-out hover:scale-110"
        onClick={() => setOpenSideMenu(!openSideMenu)}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-3xl" />
        ) : (
          <HiOutlineMenu className="text-3xl" />
        )}
      </button>

      {/* Brand Name */}
      <h2 className="text-xl font-semibold text-white tracking-wide">CrowdChoice</h2>

      {/* Mobile SideMenu */}
      {openSideMenu && (
        <div className="absolute top-full left-0 w-full bg-gray-900/90 backdrop-blur-md shadow-lg border-t border-gray-700 p-4 transition-all duration-300 ease-in-out">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
