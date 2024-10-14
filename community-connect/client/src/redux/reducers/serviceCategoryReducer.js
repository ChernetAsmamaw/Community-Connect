import {
  SERVICE_CATEGORY_REQUEST,
  SERVICE_CATEGORY_SUCCESS,
  SERVICE_CATEGORY_FAIL,
  SERVICE_CATEGORY_RESET,
} from "../constants/serviceCategoryConstants";

const serviceCategoryReducer = (state = { serviceCategory: [] }, action) => {
  switch (action.type) {
    case SERVICE_CATEGORY_REQUEST:
      return { loading: true };

    case SERVICE_CATEGORY_SUCCESS:
      console.log("Fetched Categories:", action.payload); // Debugging line
      return {
        loading: false,
        serviceCategory: action.payload,
      };

    case SERVICE_CATEGORY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case SERVICE_CATEGORY_RESET:
      return {};

    default:
      return state;
  }
};

export default serviceCategoryReducer;
