import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import Explore from "./components/Explore";
import AuthGuard from "./components/AuthGuard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/explore"
          element={
            <AuthGuard>
              <Explore />
            </AuthGuard>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
