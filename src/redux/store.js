import { configureStore } from "@reduxjs/toolkit"
import { authReducer } from "./auth/slice";
import  useReducer from "./user/slice.js";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: useReducer
    }
});

