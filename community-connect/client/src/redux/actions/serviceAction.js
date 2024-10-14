import axios from "axios";
import {
  SERVICE_LOAD_REQUEST,
  SERVICE_LOAD_SUCCESS,
  SERVICE_LOAD_FAIL,
} from "../constants/serviceConstant";

export const serviceLoadAction =
  (pageNumber = "", keyword = "", cat = "", city = "") =>
  async (dispatch) => {
    dispatch({ type: SERVICE_LOAD_REQUEST });
    try {
      axios.defaults.baseURL = "http://localhost:5000";
      const { data } = await axios.get(
        `/api/services?pageNumber=${pageNumber}&keyword=${keyword}&cat=${cat}&city=${city}`
      );
      dispatch({ type: SERVICE_LOAD_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: SERVICE_LOAD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
