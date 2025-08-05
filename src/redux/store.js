import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
import postSlice from "./postSlice.js"
import socketSlice from "./socketSlice.js"
import chatSlice from "./chatSlice.js"
import rtnSlice from "./rtnSlice.js"
import { 
 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Combine your reducers (if you have more in future)
import { combineReducers } from "redux";
import persistStore from "redux-persist/es/persistStore";

const rootReducer = combineReducers({
  auth: authSlice,
  post: postSlice,
  socketio:socketSlice,
  chat:chatSlice,
  realTimeNotification:rtnSlice,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};


const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store); // ← important!
export default store;

