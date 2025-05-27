import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { rootApi } from "./root.api";
import authReducer from "./features/authSlice";
import staysReducer from "./features/staysSlice";
import packageReducer from "./features/packagesSlice";
import propertyReducer from "./features/registerPropertyBannerSlice";
import userReducer from "./features/userSlice";
import timerReducer from "./features/timerSlice";

const rootReducer = combineReducers({
  [rootApi.reducerPath]: rootApi.reducer,
  auth: authReducer,
  stays: staysReducer,
  packages: packageReducer,
  propertyBanner: propertyReducer,
  user: userReducer,
  timer: timerReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rootApi.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

setupListeners(store.dispatch);
