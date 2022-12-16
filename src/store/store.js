// store de nuestro calendario
import { configureStore } from '@reduxjs/toolkit';
import { uiSlice, calendarSlice, authSlice } from './';

export const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		calendar: calendarSlice.reducer,
		ui: uiSlice.reducer,
	},
	// Para evitar el error de serializableCheck
	// el serializableCheck es una comprobación que hace redux para ver si el estado es serializable
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});
