import React, { useEffect, useState } from 'react';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, MenuItem, Tooltip, Avatar, Button, Container } from '@mui/material';
import HandshakeIcon from '@mui/icons-material/Handshake';
import { useDispatch, useSelector } from 'react-redux';
import { userLogoutAction } from '../redux/actions/userAction';
import headerImage from "../images/header.jpg";

const pages = ["Home"];

const Header = () => {
  const { userInfo } = useSelector((state) => state.signIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    console.log("User Info:", userInfo);
  }, [userInfo]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logOutUser = () => {
    dispatch(userLogoutAction());
    navigate("/");
    window.location.reload();
  };

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
  const isActive = (path) => location.pathname === path;

  return (
    <>
      <AppBar position="static" className='bg-primary'>
        <Container maxWidth="xl" className='bg-primary text-accent font-bold text-3xl'>
          <Toolbar disableGutters className='bg-primary'>
            <HandshakeIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/user/home"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              CConnect
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <FaBars />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <HandshakeIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component={Link}
              to="/user/home"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              CConnect
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <div>
                  <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                  component={Link}
                  to={page === "Home" ? "/user/home" : `/${page}`}
                >
                  {page}
                </Button>
                {/* <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                  component={Link}
                  to={page === "Dashboard" ? "/user/dashboard" : `/${page}`}
                >
                  {page}
                </Button>
                <Button
                  key={pages}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                  component={Link}
                  to={pages === "Bookings" ? "/user/bookings" : `/${pages}`}
                >
                  {pages}
                </Button> */}
                </div>
                
              ))}
              
            </Box>
            
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {userInfo && userInfo.role === 0 ? (
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="start" className='flex flex-col space-x-3'>
                      <div className='flex flex-col'>
                      <Link
                        style={{
                          textDecoration: "none",
                          color: "#1976d2",
                        }}
                        // to="/admin/dashboard"
                        to="/user/dashboard"
                      >
                        Dashboard
                      </Link>
                      <Link
                        style={{
                          textDecoration: "none",
                          color: "#1976d2",
                        }}
                        // to="/admin/dashboard"
                        to="/user/bookings"
                      >
                        Bookings
                      </Link>
                      </div>
                      
                    </Typography>
                    
                  </MenuItem>
                ) : null}

                {!userInfo ? (
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <Link
                        style={{
                          textDecoration: "none",
                          color: "#1976d2",
                        }}
                        to="/login"
                      >
                        Log In
                      </Link>
                    </Typography>
                  </MenuItem>
                ) : (
                  <MenuItem onClick={logOutUser}>
                    <Typography
                      style={{
                        textDecoration: "none",
                        color: "#1976d2",
                      }}
                      textAlign="center"
                    >
                      Log Out
                    </Typography>
                  </MenuItem>
                )}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Header Section */}
      <header className="bg-primary text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-center">
          {/* Search Bar for larger screens */}
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

          {/* Mobile Search Bar */}
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
        </div>

        {/* Slide-out Menu for Small Screens */}
        {isMenuOpen && (
          <div className="md:hidden flex flex-col items-center bg-primary p-4 space-y-4 text-accent">
            {pages.map((page) => (
              <div>
                <Link
                key={page}
                to={page === "Home" ? "/user/home" : `/${page}`}
                className={`hover:text-secondary transition-all duration-300 ease-in-out transform hover:scale-105 ${isActive(page === "Home" ? "/user/home" : `/${page}`) ? 'text-secondary' : ''}`}
              >
                {page}
              </Link>

              <Link
                key={page}
                to={page === "Dashboard" ? "/user/dashboard" : `/${page}`}
                className={`hover:text-secondary transition-all duration-300 ease-in-out transform hover:scale-105 ${isActive(page === "Home" ? "/user/home" : `/${page}`) ? 'text-secondary' : ''}`}
              >
                {page}
              </Link>
              </div>
              

              
            ))}
            <button
              onClick={goToNotifications}
              className={`hover:text-secondary transition-all duration-300 ease-in-out transform hover:scale-105 ${isActive('/profile') && location.state?.section === 'Notification' ? 'text-secondary' : ''}`}
            >
              Notifications
            </button>
            <Link
              to="/profile"
              className={`hover:text-secondary transition-all duration-300 ease-in-out transform hover:scale-105 ${isActive('/profile') && !location.state?.section ? 'text-secondary' : ''}`}
            >
              Profile
            </Link>
            <Link
              to="/logout"
              className={`hover:text-secondary transition-all duration-300 ease-in-out transform hover:scale-105 ${isActive('/') ? 'text-secondary' : ''}`}
            >
              Logout
            </Link>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
