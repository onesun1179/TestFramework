import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import logger from "redux-logger";
import menu from "@context/reducer/Menu.reducer";
import user from "@reducer/User.reducer";

const reducer = combineReducers({
	menu,
	user,
});

const store = configureStore({
	devTools: process.env.NODE_ENV === "development",
	reducer,
	middleware: getDefaultMiddleware().concat(logger),
});

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

declare global {
	type RootState = ReturnType<typeof reducer>;
	type Store = typeof store;
	type AppDispatch = typeof store.dispatch;
	type GetState = typeof store.getState;
}

export default store;
