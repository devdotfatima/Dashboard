import { configureStore } from "@reduxjs/toolkit";
import { globalSlice } from "state_managment";

const store = configureStore({
	reducer: {
		global: globalSlice.reducer,
	},
});

export default store;
