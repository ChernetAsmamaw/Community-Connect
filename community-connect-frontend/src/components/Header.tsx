import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router

const Header: React.FC = () => {
  const navigate = useNavigate();

  // Handle search logic
  const handleSearch = () => {
    // Search logic goes here
    alert('Searching...');
  };

  // Navigate to Profile Management Page with Notifications Section
  const goToNotifications = () => {
    navigate('/profile', { state: { section: 'Notification' } });
  };

  return (
    <header className="bg-primary text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Company Name */}
        <div className="flex items-center">
          <a href="/"><h1 className="text-3xl font-bold text-accent">C Connect</h1></a>
        </div>

        {/* Search Bar */}
        <div className="flex-1 mx-4 flex justify-center">
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

        {/* Navigation Links */}
        <div className="flex items-center space-x-4 text-accent">
          <button
            onClick={goToNotifications}
            className="hover:text-secondary transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Notifications
          </button>
          <a href="/profile" className="hover:text-secondary transition-all duration-300 ease-in-out transform hover:scale-105">Profile</a>
          <a href="/logout" className="hover:text-secondary transition-all duration-300 ease-in-out transform hover:scale-105">Logout</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
