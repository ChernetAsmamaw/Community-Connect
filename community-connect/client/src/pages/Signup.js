import React, { useState } from "react";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import heroImage from '../assets/images/ccbg.jpg';

// Yup validation schema
const validationSchema = yup.object({
  username: yup
    .string("Enter your username")
    .min(3, "Username should be at least 3 characters")
    .required("Username is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(6, "Password should be at least 6 characters")
    .required("Password is required"),
});

const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      try {
        // Send signup request to the backend
        const response = await axios.post("/api/signup", values);
        
        if (response.status === 201) {
          alert("Signup successful! Please log in.");
          navigate("/login"); // Redirect to login page
        }
      } catch (error) {
        console.error("Signup failed:", error);
        setError("Signup failed. Please try again.");
      }

      actions.resetForm(); // Reset form after submission
    },
  });

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

      {/* Registration Form Section */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
      >
        <h1 className="text-3xl font-bold text-center text-[#55883B] mb-6">Create an Account</h1>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C1E899]"
              placeholder="Enter your username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="text-red-500 text-sm">{formik.errors.username}</div>
            ) : null}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C1E899]"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            ) : null}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C1E899]"
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm">{formik.errors.password}</div>
            ) : null}
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#9A6735] text-white py-3 rounded-lg hover:bg-[#55883B] transition-colors"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            className="text-[#55883B] cursor-pointer hover:underline"
          >
            Login here
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUp;
