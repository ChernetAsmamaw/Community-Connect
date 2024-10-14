import React, { useState } from 'react';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route location
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to handle burger menu toggle

  // Handle search logic
  const handleSearch = () => {
    alert('Searching...');
  };

  // Navigate to Profile Management Page with Notifications Section
  const goToNotifications = () => {
    navigate('/profile', { state: { section: 'Notification' } });
  };

  // Toggle burger menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to check if a link is active
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-primary text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Company Name */}
        <div className="flex items-center">
          <a href="/home"><h1 className="text-3xl font-bold text-accent">CConnect</h1></a>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 mx-4 justify-center">
          <div className="relative w-3/5">
            <input
              type="text"
              placeholder="Search services..."
              className="w-full p-2 pl-4 pr-10 rounded text-black font-normal font-sans focus:outline-none"
              style={{ backgroundColor: '#E6F0DC' }}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-accent"
              onClick={handleSearch}
            >
              <FaSearch />
            </button>
          </div>
        </div>

        {/* Burger Menu Icon for Small Screens */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-3xl text-accent">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Navigation Links (Hidden on small screens) */}
        <div className="hidden md:flex items-center space-x-4 text-accent">
          <a
            href="/home"
            className={`hover:text-secondary transition-all duration-300 ease-in-out transform hover:scale-105 ${
              isActive('/home') ? 'text-secondary' : ''
            }`}
          >
            Home
          </a>
          <button
            onClick={goToNotifications}
            className={`hover:text-secondary transition-all duration-300 ease-in-out transform hover:scale-105 ${
              isActive('/profile') && location.state?.section === 'Notification' ? 'text-secondary' : ''
            }`}
          >
            Notifications
          </button>
          <a
            href="/profile"
            className={`hover:text-secondary transition-all duration-300 ease-in-out transform hover:scale-105 ${
              isActive('/profile') && !location.state?.section ? 'text-secondary' : ''
            }`}
          >
            Profile
          </a>
          <a
            href="/"
            className={`hover:text-secondary transition-all duration-300 ease-in-out transform hover:scale-105 ${
              isActive('/') ? 'text-secondary' : ''
            }`}
          >
            Logout
          </a>
        </div>
      </div>

      {/* Slide-out Menu for Small Screens */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center bg-primary p-4 space-y-4 text-accent">
          <a
            href="/home"
            className={`hover:text-secondary transition-all duration-300 ease-in-out transform hover:scale-105 ${
              isActive('/home') ? 'text-secondary' : ''
            }`}
          >
            Home
          </a>
          <button
            onClick={goToNotifications}
            className={`hover:text-secondary transition-all duration-300 ease-in-out transform hover:scale-105 ${
              isActive('/profile') && location.state?.section === 'Notification' ? 'text-secondary' : ''
            }`}
          >
            Notifications
          </button>
          <a
            href="/profile"
            className={`hover:text-secondary transition-all duration-300 ease-in-out transform hover:scale-105 ${
              isActive('/profile') && !location.state?.section ? 'text-secondary' : ''
            }`}
          >
            Profile
          </a>
          <a
            href="/logout"
            className={`hover:text-secondary transition-all duration-300 ease-in-out transform hover:scale-105 ${
              isActive('/') ? 'text-secondary' : ''
            }`}
          >
            Logout
          </a>
        </div>
      )}

      {/* Mobile Search Bar (visible on small screens) */}
      <div className="flex md:hidden justify-center mt-4">
        <div className="relative w-4/5">
          <input
            type="text"
            placeholder="Search services..."
            className="w-full p-2 pl-4 pr-10 rounded text-black font-normal font-sans focus:outline-none"
            style={{ backgroundColor: '#E6F0DC' }}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-accent"
            onClick={handleSearch}
          >
            <FaSearch />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;