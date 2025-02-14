import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-400 text-sm py-4 px-6 mt-auto border-t border-gray-700">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <p>© {new Date().getFullYear()} CrowdChoice. All rights reserved.</p>
        <p className="font-semibold text-gray-300">Developed by CR SANNUTH and J DINESH CHOWDARY</p>
      </div>
    </footer>
  );
};

export default Footer;
