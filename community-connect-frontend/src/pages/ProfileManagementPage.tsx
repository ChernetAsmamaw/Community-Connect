import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import Header from '../components/Header';

const ProfileManagementPage: React.FC = () => {
  const location = useLocation();
  const [selectedSection, setSelectedSection] = useState<string>('Profile');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPostFormOpen, setIsPostFormOpen] = useState(false); // State to control post form visibility

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
            <h2 className="text-2xl font-bold mb-4">Post Services</h2>
            <p className="text-gray-600 mb-4">Here you can post your services for others to see.</p>

            {/* Create Post Button */}
            <button
              onClick={() => setIsPostFormOpen(!isPostFormOpen)}
              className="bg-[#55883B] text-white px-4 py-2 rounded-lg hover:bg-[#9A6735] transition-colors mb-4"
            >
              {isPostFormOpen ? 'Cancel' : 'Create Post'}
            </button>

            {/* Conditional Render: Post Service Form */}
            {isPostFormOpen && (
              <div className="mt-4 p-6 bg-gray-50 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Create a New Service</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Service Name</label>
                    <input
                      type="text"
                      className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C1E899]"
                      placeholder="Enter the service name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      rows={4}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C1E899]"
                      placeholder="Describe your service"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                      type="number"
                      className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C1E899]"
                      placeholder="Enter the service price"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-[#9A6735] text-white px-4 py-2 rounded-lg hover:bg-[#55883B] transition-colors"
                    >
                      Post Service
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <Header />
      <div className="flex h-screen">
        {/* Burger Icon for Small Screens */}
        <div className="md:hidden p-4">
          <button onClick={() => setIsSidebarOpen(true)} className="text-2xl">
            <FaBars />
          </button>
        </div>

        {/* Sidebar */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}
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
            <button className="bg-accent text-white px-4 py-2 rounded-lg">Upload Picture</button>
          </div>

          {/* Sidebar Buttons */}
          <div className="space-y-4">
            {['Profile', 'Notification', 'Messages', 'Calendar', 'Post Services'].map((section) => (
              <button
                key={section}
                onClick={() => setSelectedSection(section)}
                className={`w-full px-4 py-2 rounded-lg text-left transition duration-300 ease-in-out transform hover:scale-105 ${
                  selectedSection === section
                    ? 'bg-primary text-white'
                    : 'bg-white border border-gray-300 hover:bg-gray-200'
                }`}
              >
                {section}
              </button>
            ))}
          </div>
        </div>

        {/* Right Content Section */}
        <div className="w-full md:w-3/4 p-6">{renderContent()}</div>
      </div>
    </div>
  );
};

export default ProfileManagementPage;
