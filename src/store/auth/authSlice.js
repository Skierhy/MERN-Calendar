import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
	name: 'auth',
	// el estado inicial
	initialState: {
		status: 'checking', // 'authenticated','not-authenticated',
		user: {},
		errorMessage: undefined,
	},
	reducers: {
		// reducer que cambia el estado de status a checking
		// verifica si el usuario está autenticado
		onChecking: (state) => {
			state.status = 'checking';
			state.user = {};
			state.errorMessage = undefined;
		},
		// reducer que cambia el estado de status a authenticated
		// para indicar que el usuario está autenticado
		onLogin: (state, { payload }) => {
			state.status = 'authenticated';
			state.user = payload;
			state.errorMessage = undefined;
		},
		// reducer que cambia el estado de status a not-authenticated
		// para indicar que el usuario salió de la aplicación
		onLogout: (state, { payload }) => {
			state.status = 'not-authenticated';
			state.user = {};
			state.errorMessage = payload;
		},
		clearErrorMessage: (state) => {
			state.errorMessage = undefined;
		},
	},
});

// Action creators are generated for each case reducer function
export const { onChecking, onLogin, onLogout, clearErrorMessage } =
	authSlice.actions;
