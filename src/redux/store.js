import {
  combineReducers,
  configureStore,
  createAction,
} from '@reduxjs/toolkit';
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
import { authReducer } from './auth/slice';
import useReducer from './user/slice.js';
import popoverReducer from '../redux/popover/slice';
import modalReducer from '../redux/modal/slice';
import waterReducer from '../redux/water/slice.js';
import waterMonthReducer from "../redux/water/calendar/slice.js"
import { setupAxiosInterceptors } from "./auth/operations";

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['accessToken'],
};

export const resetStore = createAction('RESET_STORE');

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  user: useReducer,
  popover: popoverReducer,
  modal: modalReducer,
  water: waterReducer,
  waterMonth: waterMonthReducer,
});

const rootReducersWithReset = (state, action) => {
  if (action.type === resetStore.type) {
    return (state = undefined);
  }
  return rootReducer(state, action);
};

// export const store = configureStore({
//   reducer: {
//     auth: persistReducer(authPersistConfig, authReducer),
//     user: useReducer,
//     popover: popoverReducer,
//     modal: modalReducer,
//     water: waterReducer,
//   },
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

export const store = configureStore({
  reducer: rootReducersWithReset,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

setupAxiosInterceptors(store);

export const persistor = persistStore(store);
