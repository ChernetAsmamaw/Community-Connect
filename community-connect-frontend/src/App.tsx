import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header'; 
import Homepage from './pages/Homepage'; 
import BookingPage from './pages/BookingPage'; 
import ProfileManagementPage from './pages/ProfileManagementPage';
import './App.css'; 

function App() {
  return (
    <Router>
      <div>
        {/* Header remains persistent on all pages */}
        <Header />

        {/* Define Routes for different pages */}
        <Routes>
          {/* Route for Homepage */}
          <Route path="/" element={<Homepage />} />

          {/* Route for BookingPage */}
          <Route path="/booking" element={<BookingPage />} />
          
          {/* Route for ProfileManagementPage */}
          <Route path="/profile" element={<ProfileManagementPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
