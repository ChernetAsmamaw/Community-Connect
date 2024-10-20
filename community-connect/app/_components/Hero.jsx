"use client"; // Ensure this is a client-side component
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import heroImage from "../../public/ccbg.jpg";
import { Input } from "@/components/ui/input";
import { Link, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

function Hero() {
  return (
    <section>
      {/* Hero Section */}
      <div style={{ backgroundColor: "#bce37f" }} className="lg:mx-0 pb-16 ">
        <div className="container h-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:pt-16 pt-8 pb-2">
          {/* Text Section */}
          <div className="flex flex-col items-center justify-center">
            {/* Animated Headline */}
            <motion.h1
              className="text-5xl font-semibold text-primary mb-6 text-center mb:mx-2 lg:mx-4 sm:mx-0"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Welcome to Community Connect
            </motion.h1>

            {/* Animated Subtext */}
            <motion.p
              className="text-lg font-normal mb-6 text-center max-w-md text-gray-700 "
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Discover and connect with local businesses, artisans, and services
              in your community.
            </motion.p>

            {/* Call to Action */}
            <motion.a
              href="#businesses"
              className="bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-secondary transition-colors duration-200 hover:text-primary"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              onClick={() => signIn("descope")}
            >
              Get Started!
            </motion.a>
          </div>

          {/* Image Section with Animation */}
          <motion.div
            className="flex items-center justify-center mt-6 md:mt-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <Image
              src={heroImage}
              alt="Community Connect Background"
              className="w-[80%] h-auto max-h-[400px] object-cover"
            />
          </motion.div>
        </div>
      </div>

      {/* Search Box ShadContainer */}
      <div className="container mx-auto mt-10 flex justify-center items-center gap-4">
        <Input
          placeholder="Search for businesses, artisans, services"
          className="rounded-full md:w-[400px] shadow-md border-cyan-950 mt-1"
        />
        <Button className="bg-primary text-white rounded-full h-[45px] w-[45px]">
          <Search />
        </Button>
      </div>
    </section>
  );
}

export default Hero;
