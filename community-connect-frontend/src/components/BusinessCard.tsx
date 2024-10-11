import React from 'react';
import { useNavigate } from 'react-router-dom';

interface BusinessCardProps {
  name: string;
  service: string;
  location: string;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ name, service, location }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle the booking button click
  const handleBookingClick = () => {
    navigate('/booking'); // Navigate to the booking page
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto flex items-center justify-between border border-gray-200 flex-col md:flex-row space-y-6 md:space-y-0">
      {/* Picture Section */}
      <div className="flex-shrink-0">
        <div className="w-24 h-24 rounded-full border border-gray-300 flex items-center justify-center mx-auto md:mx-0">
          <span className="text-gray-500">Picture</span>
        </div>
      </div>

      {/* Info Section */}
      <div className="text-center md:text-left mx-4 flex-grow">
        <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
        <p className="text-gray-600">{service}</p>
        <p className="text-gray-600">{location}</p>
      </div>

      {/* Book Service Button */}
      <div className="flex-shrink-0">
        <button
          onClick={handleBookingClick} // Add the click handler to navigate
          className="px-6 py-2 text-accent border border-gray-300 rounded-full hover:bg-secondary hover:text-white transition-colors w-full md:w-auto"
        >
          Book Service
        </button>
      </div>
    </div>
  );
};

export default BusinessCard;
