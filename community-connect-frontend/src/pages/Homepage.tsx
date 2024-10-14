import React from 'react';
import HeroSection from '../components/HeroSection';
import BusinessCard from '../components/BusinessCard';
import Header from '../components/Header';

const Homepage: React.FC = () => {
  const businesses = [
    { name: 'Local Bakery', service: 'Bakery', location: 'Downtown' },
    { name: 'John\'s Plumbing', service: 'Plumbing', location: 'Uptown' },
    { name: 'City Yoga Studio', service: 'Yoga', location: 'City Center' }
  ];

  return (
    <div>
      < Header />
      {/* Hero Section */}
      <HeroSection />

      {/* Business Cards Section */}
      <section id="businesses" className="bg-[#E6F0DC] py-10">
      <div className="space-y-6 p-6">
      {businesses.map((business, index) => (
        <div key={index} className="w-full">
          <BusinessCard
            name={business.name}
            service={business.service}
            location={business.location}
          />
        </div>
      ))}
    </div>
      </section>
    </div>
  );
};

export default Homepage;
