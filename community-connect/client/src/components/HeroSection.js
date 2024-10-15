import React from 'react';
import { motion } from 'framer-motion';
import heroImage from '../assets/images/ccbg.jpg';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-primary text-white p-10">
      <div className="container mx-auto h-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Text Section */}
        <div className="flex flex-col items-center justify-center">
          {/* Animated Headline */}
          <motion.h1
            className="text-5xl font-semibold text-accent mb-4 text-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Welcome to Community Connect
          </motion.h1>

          {/* Animated Subtext */}
          <motion.p
            className="text-lg text-black font-normal mb-6 text-center"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Discover and connect with local businesses, artisans, and services in your community.
          </motion.p>

          {/* Call to Action */}
          <motion.a
            href="#businesses"
            className="bg-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-secondary transition-colors duration-300"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            Explore Now
          </motion.a>
        </div>

        {/* Image Section with Animation */}
        <motion.div
          className="flex items-center justify-center mt-6 md:mt-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <img
            src={heroImage}
            alt="Community Connect Background"
            className="w-[80%] h-auto max-h-[400px] object-cover"
          />
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;