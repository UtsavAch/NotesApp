import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  noteListReducer,
  noteCreateReducer,
  noteUpdateReducer,
} from "./reducers/noteReducers";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  noteList: noteListReducer,
  noteCreate: noteCreateReducer,
  noteUpdate: noteUpdateReducer,
});

const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: {
    userInfo: userInfoFromLocalStorage,
  },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
