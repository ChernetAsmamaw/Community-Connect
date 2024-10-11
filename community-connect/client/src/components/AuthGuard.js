import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Use js-cookie to handle cookies easily

const AuthGuard = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("jwt");

    if (!token) {
      // If no token, redirect to login
      navigate("/login");
    }
  }, [navigate]);

  return children; // If authenticated, render the component (Explore in this case)
};

export default AuthGuard;
