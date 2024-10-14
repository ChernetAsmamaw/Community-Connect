export const loadServiceReducer = (
  state = { services: [], setUniqueCity: [] },
  action
) => {
  switch (action.type) {
    case "SERVICE_LOAD_REQUEST":
      return { loading: true };
    case "SERVICE_LOAD_SUCCESS":
      return {
        loading: false,
        success: action.payload.success,
        page: action.payload.page,
        pages: action.payload.pages,
        count: action.payload.count,
        setUniqueCity: action.payload.setUniqueCity || state.setUniqueCity,
        services: action.payload.services,
      };
    case "SERVICE_LOAD_FAIL":
      return { loading: false, error: action.payload };
    case "SERVICE_LOAD_RESET":
      return {};
    default:
      return state;
  }
};
