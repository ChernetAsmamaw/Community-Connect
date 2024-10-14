import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import MyCalendar from './pages/MyCalendar';
import ProfileManagementPage from './pages/ProfileManagementPage';
import LoginPage from './pages/LoginPage';
import './App.css';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Router>
      <div>
        
        {/* Define Routes for different pages */}
        <Routes>
          {/* Route for Homepage */}
          <Route path="/" element={<LoginPage/>} />
          <Route path="/home" element={<Homepage />} />

          {/* Route for BookingPage */}
          <Route path="/booking" element={<MyCalendar />} />

          {/* Route for ProfileManagementPage */}
          <Route path="/profile" element={<ProfileManagementPage />} />

          {/* Route for LoginPage */}
          <Route path="/login" element={<LoginPage />} />

          {/* Route for RegisterPage */}
          <Route path="/register" element={<RegisterPage />} />

          {/* Route for LoginPage */}
          <Route path="/logout" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
