import React from 'react';
import { FaPlane } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-gray-200 text-white p-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-3xl font-bold flex items-center">
          <FaPlane className="mr-2 text-pink-600 transform rotate-45" /> {/* Ícono rotado para dar dinamismo */}
          <span className="text-pink">EleganceStay</span>
        </h1>
      </div>
    </header>
  );
};

export default Header;
