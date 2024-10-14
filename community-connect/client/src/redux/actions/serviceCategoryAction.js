import axios from "axios";
import {
  SERVICE_CATEGORY_SUCCESS,
  SERVICE_CATEGORY_FAIL,
  SERVICE_CATEGORY_REQUEST,
} from "../constants/serviceCategoryConstants";

// Action to fetch service categories
export const fetchServiceCategories = () => async (dispatch) => {
  dispatch({ type: SERVICE_CATEGORY_REQUEST });
  try {
    axios.defaults.baseURL = "http://localhost:5000";
    const response = await axios.get(`/api/categories`);
    dispatch({
      type: SERVICE_CATEGORY_SUCCESS,
      payload: response.data.serviceCategories, // Changed from response.data
    });
  } catch (error) {
    dispatch({
      type: SERVICE_CATEGORY_FAIL,
      payload: error.response?.data?.error || error.message,
    });
  }
};
