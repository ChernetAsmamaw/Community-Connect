import axios from "axios";
import { toast } from "react-toastify";
import {
  USER_LOAD_FAIL,
  USER_LOAD_REQUEST,
  USER_LOAD_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL,
  SERVICE_POST_REQUEST, SERVICE_POST_SUCCESS, SERVICE_POST_FAIL
} from "../constants/userConstant";

/************ Sign in action ************/
export const userSignInAction = (user) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST });
  try {
    axios.defaults.baseURL = "http://localhost:5000";

    const { data } = await axios.post("/api/login", user);
    console.log("Login Response Data:", data); // Log the response

    // Create a new user object that includes isAuthenticated
    const userData = {
      ...data,
      isAuthenticated: true, // Add isAuthenticated property
    };

    // Store the new user object in localStorage
    localStorage.setItem("userInfo", JSON.stringify(userData));
    console.log("Stored User Info:", localStorage.getItem("userInfo")); // Log stored data

    // Dispatch the new user object
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: userData, // Use the new userData object
    });

    toast.success("Logged in successfully!");
  } catch (error) {
    const errorMessage =
      error.response?.status === 401
        ? "Invalid credentials. Please try again."
        : error.response?.data?.error || error.message;
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload: errorMessage,
    });
    toast.error(errorMessage);
  }
};

/************ Logout action ************/
export const userLogoutAction = () => async (dispatch) => {
  dispatch({ type: USER_LOGOUT_REQUEST });
  try {
    axios.defaults.baseURL = "http://localhost:5000";
    axios.defaults.headers.common["Authorization"] = `Bearer ${
      localStorage.getItem("userInfo")?.token
    }`;

    console.log(
      "Attempting to log out with token:",
      localStorage.getItem("userInfo")?.token
    );

    const { data } = await axios.get("/api/logout");
    console.log("Logout response:", data);

    localStorage.removeItem("userInfo");
    dispatch({
      type: USER_LOGOUT_SUCCESS,
      payload: data,
    });
    toast.success("Logged out successfully!");
  } catch (error) {
    console.error("Error logging out:", error);

    if (error.response.data.message === "No user is logged in") {
      console.error("Error logging out: User is not logged in");
      dispatch({
        type: USER_LOGOUT_FAIL,
        payload: "User   is not logged in",
      });
      toast.error("User   is not logged in");
    } else {
      console.error("Error logging out:", error);
      dispatch({
        type: USER_LOGOUT_FAIL,
        payload: error.response.data.error || error.message,
      });
      toast.error(error.response.data.error || error.message);
    }
  }
};

/************ Load user profile action ************/
export const userProfileAction = () => async (dispatch) => {
  dispatch({ type: USER_LOAD_REQUEST });
  try {
    axios.defaults.baseURL = "http://localhost:5000";

    const { data } = await axios.get("/api/me");
    console.log("User profile response:", data);
    dispatch({
      type: USER_LOAD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LOAD_FAIL,
      payload: error.response.data.error,
    });
  }
};

/************ Update user profile action ************/
export const updateUserAction = (userData) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });

    // Get the user info from the state
    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`, // Use token for authentication
      },
    };

    // Make the API call to update user
    const { data } = await axios.put('/api/users/profile', userData, config);

    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

/************ Post Service action ************/
export const postServiceAction = (serviceData) => async (dispatch, getState) => {
  try {
    dispatch({ type: SERVICE_POST_REQUEST });

    // Get the user info from the state
    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`, // Use token for authentication
      },
    };

    // Make the API call to post the service
    const { data } = await axios.post('/api/services', serviceData, config);

    dispatch({ type: SERVICE_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SERVICE_POST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};