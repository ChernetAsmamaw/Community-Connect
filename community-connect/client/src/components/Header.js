import React, { useEffect, useState } from 'react';
import { FaSearch, FaBars, FaTimes, FaUserCircle, FaBell } from 'react-icons/fa';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogoutAction } from '../redux/actions/userAction';

const Header = () => {
  const { userInfo } = useSelector((state) => state.signIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    console.log('User Info:', userInfo);
  }, [userInfo]);

  const handleSearch = () => alert('Searching...');

  const goToNotifications = () =>
    navigate('/user/profile', { state: { section: 'Notification' } });

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  const isActive = (path) => location.pathname === path;

  const logOutUser = () => {
    dispatch(userLogoutAction());
    navigate('/');
    window.location.reload();
  };

  return (
    <header className="bg-primary text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/user/home">
          <h1 className="text-3xl font-bold text-accent">CConnect</h1>
        </Link>

        {/* Search Bar (Desktop) */}
        <div className="hidden md:flex flex-1 mx-4 justify-center">
          <div className="relative w-3/5">
            <input
              type="text"
              placeholder="Search services..."
              className="w-full p-2 pl-4 pr-10 rounded text-black"
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

        {/* Burger Menu (Mobile) */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-3xl text-accent">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex items-center space-x-4 text-accent">
          
          <Link to="/user/home" className={`hover:scale-105 ${isActive('/user/home') ? 'text-secondary' : ''}`}>
            Home
          </Link>
          
          <Link to="/user/services" className={`hover:scale-105 ${isActive('/user/services') ? 'text-secondary' : ''}`}>
            Services
          </Link>
          
          <Link to="/user/booking" className={`hover:scale-105 ${isActive('/user/booking') ? 'text-secondary' : ''}`}>
            Bookings
          </Link>

          {/* Notification Bell Icon */}
          <button
            onClick={goToNotifications}
            className="text-xl text-accent hover:scale-110 relative"
          >
            <FaBell />
          </button>

          {/* User Icon with Dropdown */}
          <div className="relative z-10">
            <button onClick={toggleUserMenu} className="text-3xl text-black hover:scale-110">
              <FaUserCircle />
            </button>
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg">
                <Link
                  to="/user/profile"
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    logOutUser();
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center bg-primary p-4 space-y-4 text-accent">
          <Link to="/user/home" className={`hover:scale-105 ${isActive('/user/home') ? 'text-secondary' : ''}`}>
            Home
          </Link>
          <Link to="/user/booking" className={`hover:scale-105 ${isActive('/user/booking') ? 'text-secondary' : ''}`}>
            Bookings
          </Link>
          <Link to="/user/services" className={`hover:scale-105 ${isActive('/user/services') ? 'text-secondary' : ''}`}>
            Services
          </Link>
          <button
            onClick={goToNotifications}
            className={`hover:scale-105 ${
              isActive('/profile') && location.state?.section === 'Notification' ? 'text-secondary' : ''
            }`}
          >
            Notifications
          </button>
          <Link to="/user/profile" className={`hover:scale-105 ${isActive('/user/profile') ? 'text-secondary' : ''}`}>
            Profile
          </Link>
          {userInfo ? (
            <button onClick={logOutUser} className="hover:scale-105">
              Logout
            </button>
          ) : (
            <Link to="/login" className="hover:scale-105">
              Login
            </Link>
          )}
        </div>
      )}

      {/* Mobile Search Bar */}
      <div className="flex md:hidden justify-center mt-4">
        <div className="relative w-4/5">
          <input
            type="text"
            placeholder="Search services..."
            className="w-full p-2 pl-4 pr-10 rounded text-black"
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
