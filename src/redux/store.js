import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authReducer } from "./auth/slice";
import  useReducer from "./user/slice.js";
import popoverReducer from '../redux/popover/slice';
import modalReducer from '../redux/modal/slice';
import waterReducer from './water/slice';
import { setupAxiosInterceptors } from "./auth/operations";

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['accessToken'],
};

export const store = configureStore({
    reducer: {
        auth: persistReducer(authPersistConfig, authReducer),
        user: useReducer,
        popover: popoverReducer,
        modal: modalReducer,
        water: waterReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

setupAxiosInterceptors(store);

export const persistor = persistStore(store);
