import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Icons for burger menu

const ProfileManagementPage: React.FC = () => {
  const location = useLocation();
  const [selectedSection, setSelectedSection] = useState<string>('Profile');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar toggle

  // Check if state was passed from the Header for Notifications
  useEffect(() => {
    if (location.state && location.state.section) {
      setSelectedSection(location.state.section);
    }
  }, [location.state]);

  // Function to render content based on the selected section
  const renderContent = () => {
    switch (selectedSection) {
      case 'Profile':
        return (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-2">Edit Profile</h2>
            <p className="text-gray-600">Here you can edit your email, username, or password.</p>
            <div className="space-y-4 mt-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-700">Email: joe.poe@example.com</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-700">Username: JoePoe123</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-700">Password: ********</p>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-secondary">
                Edit Profile
              </button>
            </div>
          </div>
        );
      case 'Notification':
        return (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-2">Notifications</h2>
            <p className="text-gray-600">No notifications at the moment.</p>
          </div>
        );
      case 'Messages':
        return (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-2">Messages</h2>
            <p className="text-gray-600">You have no new messages.</p>
          </div>
        );
      case 'Calendar':
        return (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-2">Calendar</h2>
            <p className="text-gray-600">No upcoming events or appointments.</p>
          </div>
        );
      case 'Post Services':
        return (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-2">Post Services</h2>
            <p className="text-gray-600">Here you can post your services for others to see.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Burger Icon for Small Screens */}
      <div className="md:hidden p-4">
        <button onClick={() => setIsSidebarOpen(true)} className="text-2xl">
          <FaBars />
        </button>
      </div>

      {/* Sidebar (Hidden on small screens) */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden ${
          isSidebarOpen ? 'block' : 'hidden'
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white z-20 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 md:relative md:translate-x-0 md:w-1/4 border-r-2 pr-6`}
      >
        <div className="md:hidden p-4">
          <button onClick={() => setIsSidebarOpen(false)} className="text-2xl">
            <FaTimes />
          </button>
        </div>

        {/* Profile Picture Upload */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center mb-4">
            <span className="text-gray-600">Profile</span>
          </div>
          <button className="bg-accent text-white px-4 py-2 rounded-lg">
            Upload Picture
          </button>
        </div>

        {/* Sidebar Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => setSelectedSection('Profile')}
            className={`w-full px-4 py-2 rounded-lg text-left transition duration-300 ease-in-out transform hover:scale-105 ${
              selectedSection === 'Profile' ? 'bg-primary text-white' : 'bg-white border border-gray-300 hover:bg-gray-200'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setSelectedSection('Notification')}
            className={`w-full px-4 py-2 rounded-lg text-left transition duration-300 ease-in-out transform hover:scale-105 ${
              selectedSection === 'Notification' ? 'bg-primary text-white' : 'bg-white border border-gray-300 hover:bg-gray-200'
            }`}
          >
            Notification
          </button>
          <button
            onClick={() => setSelectedSection('Messages')}
            className={`w-full px-4 py-2 rounded-lg text-left transition duration-300 ease-in-out transform hover:scale-105 ${
              selectedSection === 'Messages' ? 'bg-primary text-white' : 'bg-white border border-gray-300 hover:bg-gray-200'
            }`}
          >
            Messages
          </button>
          <button
            onClick={() => setSelectedSection('Calendar')}
            className={`w-full px-4 py-2 rounded-lg text-left transition duration-300 ease-in-out transform hover:scale-105 ${
              selectedSection === 'Calendar' ? 'bg-primary text-white' : 'bg-white border border-gray-300 hover:bg-gray-200'
            }`}
          >
            Calendar
          </button>
          <button
            onClick={() => setSelectedSection('Post Services')}
            className={`w-full px-4 py-2 rounded-lg text-left transition duration-300 ease-in-out transform hover:scale-105 ${
              selectedSection === 'Post Services' ? 'bg-primary text-white' : 'bg-white border border-gray-300 hover:bg-gray-200'
            }`}
          >
            Post Services
          </button>
        </div>
      </div>

      {/* Right Content Section */}
      <div className="w-full md:w-3/4 p-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default ProfileManagementPage;
