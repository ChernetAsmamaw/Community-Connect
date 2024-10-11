import React, { useEffect, useState } from "react";
import Cookies from "js-cookie"; // Import js-cookie
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get the JWT from cookies
    const token = Cookies.get("jwt");

    if (token) {
      // Optionally, you can fetch user details from the server using the token if required.
      const loggedInUser = { username: "exampleUser" }; // Example hardcoded data
      setUser(loggedInUser);
    } else {
      console.log("No token found in cookies.");
    }
  }, []);

  const handleLogout = () => {
    fetch("http://localhost:5000/logout", {
      method: "POST",
      credentials: "include", // Ensure cookies are included in the request
    })
      .then(() => {
        setUser(null); // Clear user from state
        Cookies.remove("jwt"); // Remove the JWT cookie

        // Show success toast notification on logout
        toast.success("Logged out successfully!", {
          position: "top-center",
        });

        // Redirect to the login page after a short delay
        setTimeout(() => {
          window.location.assign("/login");
        }, 2000); // Delay to allow the toast to display
      })
      .catch((error) => {
        console.error("Error logging out:", error);
        // Show error toast notification if logout fails
        toast.error("Error logging out. Please try again.", {
          position: "top-center",
        });
      });
  };

  return (
    <div>
      <header className="flex justify-between items-center bg-gray-800 p-4">
        <h1 className="text-white text-2xl">Community Connect</h1>
        <nav>
          {user ? (
            <>
              <span className="text-white mr-4">Welcome, {user.username}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
                <a href="/signup">Sign Up</a>
              </button>
              <button className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
                <a href="/login">Login</a>
              </button>
            </>
          )}
        </nav>
      </header>

      <main className="p-4">
        <h2 className="text-xl">Home</h2>
        <p>
          Welcome to Community Connect. Connect with your community by exploring
          events, joining groups, and meeting new people.
        </p>
        <button className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
          <a href="/explore">Explore</a>
        </button>
      </main>

      {/* ToastContainer for displaying toast messages */}
      <ToastContainer />
    </div>
  );
};

export default Home;
