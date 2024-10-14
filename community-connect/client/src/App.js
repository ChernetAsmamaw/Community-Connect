import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PageNotFound from "./pages/NotFound";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserRoute from "./components/UserRoute";
import Layout from "./pages/global/Layout";
import { ProSidebarProvider } from "react-pro-sidebar";
import UserBookingHistory from "./pages/user/UserBookingHistory";

// HOC
const DashboardHOC = Layout(Dashboard);
const UserBookingHistoryHOC = Layout(UserBookingHistory);

const App = () => {
  return (
    <>
      <ToastContainer />
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <ProSidebarProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<PageNotFound />} />
              <Route path="/search/:city" element={<Home />} />
              <Route path="/search/:keyword" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/user/dashboard"
                element={
                  <UserRoute>
                    <DashboardHOC />
                  </UserRoute>
                }
              />
              <Route
                path="/user/services"
                element={<UserBookingHistoryHOC />}
              />
            </Routes>
          </Router>
        </ProSidebarProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
