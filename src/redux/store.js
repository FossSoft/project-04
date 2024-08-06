import { configureStore } from "@reduxjs/toolkit"
import { authReducer } from "./auth/slice";
import  useReducer from "./user/slice.js";
import popoverReducer from '../redux/popover/slice';
import modalReducer from '../redux/modal/slice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: useReducer,
        popover: popoverReducer,
        modal: modalReducer,
    }
});
