import React from 'react';
import { FaPlane, FaList, FaClipboardList } from 'react-icons/fa'; // Importa FaClipboardList
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-200 text-white p-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-3xl font-bold flex items-center">
          <FaPlane className="mr-2 text-pink-600 transform rotate-45" /> {/* Ícono rotado para dar dinamismo */}
          <span className="text-pink">EleganceStay</span>
        </h1>
        {/* Navigation */}
        <nav className="flex items-center space-x-4">
          <Link to="/hotels" className="text-white hover:text-pink-600">
            <FaList size={24} />
          </Link>
          <Link to="/manage-hotels" className="text-white hover:text-pink-600">
            <FaClipboardList size={24} />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
