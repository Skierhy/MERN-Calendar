import {
	authSlice,
	clearErrorMessage,
	onLogin,
	onLogout,
} from '../../../src/store/auth/authSlice';
import { authenticatedState, initialState } from '../../fixtures/authStates';
import { testUserCredentials } from '../../fixtures/testUser';

describe('Pruebas en authSlice', () => {
	test('debe de regresar el estado inicial', () => {
		// revisamos que el estado inicial sea el que esperamos
		// en este caso, el estado inicial es el que se encuentra en el archivo authStates.js
		expect(authSlice.getInitialState()).toEqual(initialState);
	});

	test('debe de realizar un login', () => {
		// ejecutamos el reducer con el estado inicial y la acción onLogin
		const state = authSlice.reducer(
			initialState,
			onLogin(testUserCredentials)
		);
		// revisamos que el estado sea el que esperamos
		// se usa toEqual porque es un objeto
		expect(state).toEqual({
			status: 'authenticated',
			user: testUserCredentials,
			errorMessage: undefined,
		});
	});

	test('debe de realizar el logout', () => {
		// ejecutamos el reducer con el estado inicial y la acción onLogout
		const state = authSlice.reducer(authenticatedState, onLogout());
		// revisamos que el estado sea el que esperamos
		// ahora el usuario debe estar vacío
		expect(state).toEqual({
			status: 'not-authenticated',
			user: {},
			errorMessage: undefined,
		});
	});

	test('debe de realizar el logout', () => {
		// ejecutamos el reducer con el estado inicial y la acción onLogout
		// en este caso, le pasamos un mensaje de error
		const errorMessage = 'Credenciales no válidas';
		// mandar el mensajes de erro se manda en onLogout
		const state = authSlice.reducer(
			authenticatedState,
			onLogout(errorMessage)
		);
		expect(state).toEqual({
			status: 'not-authenticated',
			user: {},
			errorMessage: errorMessage,
		});
	});

	test('debe de limpiar el mensaje de error', () => {
		// creamos un mensaje de error
		const errorMessage = 'Credenciales no válidas';
		// ejecutamos el reducer con el estado inicial y la acción onLogout con el mensaje de error
		const state = authSlice.reducer(
			authenticatedState,
			onLogout(errorMessage)
		);
		// recuperamos el estado con el mensaje de error para hacer la limpieza del mensaje de error
		const newState = authSlice.reducer(state, clearErrorMessage());
		// revisamos que el mensaje de error se haya limpiado
		expect(newState.errorMessage).toBe(undefined);
	});
});
