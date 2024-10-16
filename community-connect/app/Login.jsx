import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import heroImage from "../public/ccbg.jpg";
import { useDescope, useSession, useUser } from "@descope/nextjs-sdk/client";
import { SignInFlow } from "@descope/nextjs-sdk/*";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    setError("");
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-primary p-4">
      {/* Image Section */}
      <div className="w-full lg:w-1/2 flex justify-center mb-6 lg:mb-0">
        <img
          src={heroImage}
          alt="Community Connect"
          className="w-28 md:w-28 lg:w-full object-cover max-h-[400px] rounded-md lg:rounded-none lg:max-h-screen"
        />
      </div>

      {/* Login Form Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg lg:w-1/2"
      >
        <h1 className="text-3xl font-bold text-center text-[#55883B] mb-6">
          Welcome Back!
        </h1>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C1E899]"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C1E899]"
              placeholder="Enter your password"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#9A6735] text-white py-3 rounded-lg hover:bg-[#55883B] transition-colors"
          >
            Login
          </button>
          <SignInFlow
            onSuccess={() => alert("Login successful!")}
            onError={(error) => alert("Login failed!")}
          />
        </form>

        <p className="mt-6 text-center text-sm">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-[#55883B] cursor-pointer hover:underline"
          >
            Register here
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
