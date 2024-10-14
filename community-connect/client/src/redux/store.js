import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { loadServiceReducer } from "./reducers/serviceReducer";
import serviceCategoryReducer from "./reducers/serviceCategoryReducer";
import {
  userReducerSignIn,
  userReducerProfile,
  userReducerLogout,
} from "./reducers/userReducer";
import { userProfileAction } from "./actions/userAction";

/******** Combine Reducers ********/
const rootReducer = combineReducers({
  loadService: loadServiceReducer,
  serviceCategory: serviceCategoryReducer,
  signIn: userReducerSignIn,
  userProfile: userReducerProfile,
  logOut: userReducerLogout,
});

/******** Create Store ********/
let initialState = {
  signIn: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

const middleware = [thunk];
const store = createStore(
  rootReducer, // Updated variable name to rootReducer
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
