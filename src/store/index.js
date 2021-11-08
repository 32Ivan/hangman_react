import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../Login/login_store";



export default configureStore({
  reducer: {
    login: loginReducer,
 
  },
});

