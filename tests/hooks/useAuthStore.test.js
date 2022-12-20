import { configureStore } from '@reduxjs/toolkit';
import { act, renderHook, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { calendarApi } from '../../src/api';
import { useAuthStore } from '../../src/hooks/useAuthStore';
import { authSlice } from '../../src/store/';
import { initialState, notAuthenticatedState } from '../fixtures/authStates';
import { testUserCredentials } from '../fixtures/testUser';

// Esta función nos permite crear un mockStore
const getMockStore = (initialState) => {
	return configureStore({
		reducer: {
			auth: authSlice.reducer,
		},
		preloadedState: {
			auth: { ...initialState },
		},
	});
};

describe('Pruebas en useAuthStore', () => {
	// Limpiamos el localStorage antes de cada prueba
	beforeEach(() => localStorage.clear());

	test('debe de regresar los valores por defecto', () => {
		// Creamos un mockStore con los valores por defecto
		const mockStore = getMockStore({ ...initialState });
		// renderizamos el hook con ayuda de wrapper
		// contiene el provider que nos permite usar el store
		const { result } = renderHook(() => useAuthStore(), {
			wrapper: ({ children }) => (
				<Provider store={mockStore}>{children}</Provider>
			),
		});
		// Comprobamos que los valores por defecto sean correctos
		expect(result.current).toEqual({
			errorMessage: undefined,
			status: 'checking',
			user: {},
			checkAuthToken: expect.any(Function),
			startLogin: expect.any(Function),
			startLogout: expect.any(Function),
			startRegister: expect.any(Function),
		});
	});

	test('startLogin debe de realizar el login correctamente', async () => {
		// Creamos un mockStore con los valores por defecto
		const mockStore = getMockStore({ ...notAuthenticatedState });
		// renderizamos el hook con ayuda de wrapper
		const { result } = renderHook(() => useAuthStore(), {
			wrapper: ({ children }) => (
				<Provider store={mockStore}>{children}</Provider>
			),
		});

		// Simulamos el login
		// se necesita usar el async/await porque el hook usa el await
		await act(async () => {
			await result.current.startLogin(testUserCredentials);
		});
		// desestructuramos los valores del hook
		const { errorMessage, status, user } = result.current;
		// Comprobamos que los valores sean correctos
		expect({ errorMessage, status, user }).toEqual({
			errorMessage: undefined,
			status: 'authenticated',
			user: { name: 'Pruebas', uid: '639e4ca0f22f8b5d388e341c' },
		});
		// Comprobamos que se haya guardado el token en el localStorage
		// y que sea de tipo string
		// y que se haya guardado la fecha de inicio del token
		// y que sea de tipo string
		expect(localStorage.getItem('token')).toEqual(expect.any(String));
		expect(localStorage.getItem('token-init-date')).toEqual(
			expect.any(String)
		);
	});

	test('startLogin debe de fallar la autenticación', async () => {
		// Creamos un mockStore con los valores por defecto
		const mockStore = getMockStore({ ...notAuthenticatedState });
		// renderizamos el hook con ayuda de wrapper
		const { result } = renderHook(() => useAuthStore(), {
			wrapper: ({ children }) => (
				<Provider store={mockStore}>{children}</Provider>
			),
		});
		// await act para que el hook espere a que se resuelva la promesa
		await act(async () => {
			await result.current.startLogin({
				email: 'algo@google.com',
				password: '123456789',
			});
		});
		// desestructuramos los valores del hook
		const { errorMessage, status, user } = result.current;
		expect(localStorage.getItem('token')).toBe(null);
		expect({ errorMessage, status, user }).toEqual({
			errorMessage: 'Credenciales incorrectas',
			status: 'not-authenticated',
			user: {},
		});
		// waitFor para esperar a que se actualice el estado se usa normalmente con await
		await waitFor(() =>
			expect(result.current.errorMessage).toBe(undefined)
		);
	});

	test('startRegister debe de crear un usuario', async () => {
		// creamos un usuario de prueba
		const newUser = {
			email: 'algo@google.com',
			password: '123456789',
			name: 'Test User 2',
		};
		// creamos un mockStore con los valores por defecto
		const mockStore = getMockStore({ ...notAuthenticatedState });
		// renderizamos el hook con ayuda de wrapper
		const { result } = renderHook(() => useAuthStore(), {
			wrapper: ({ children }) => (
				<Provider store={mockStore}>{children}</Provider>
			),
		});
		// creamos un spy para simular la respuesta del servidor
		// mockReturnValue para simular la respuesta del servidor
		const spy = jest.spyOn(calendarApi, 'post').mockReturnValue({
			data: {
				ok: true,
				uid: '1263781293',
				name: 'Test User',
				token: 'ALGUN-TOKEN',
			},
		});
		// hacemos la petición
		await act(async () => {
			await result.current.startRegister(newUser);
		});

		const { errorMessage, status, user } = result.current;

		expect({ errorMessage, status, user }).toEqual({
			errorMessage: undefined,
			status: 'authenticated',
			user: { name: 'Test User', uid: '1263781293' },
		});
		// !IMPORTANTE: restaurar el spy para que no afecte a otros test
		spy.mockRestore();
	});

	test('startRegister debe de fallar la creación', async () => {
		const mockStore = getMockStore({ ...notAuthenticatedState });
		const { result } = renderHook(() => useAuthStore(), {
			wrapper: ({ children }) => (
				<Provider store={mockStore}>{children}</Provider>
			),
		});
		// hacemos la petición para crear un usuario
		await act(async () => {
			await result.current.startRegister(testUserCredentials);
		});

		const { errorMessage, status, user } = result.current;
		// comprobamos que los valores sean correctos
		// que el usuario ya existe
		expect({ errorMessage, status, user }).toEqual({
			errorMessage: 'El usuario ya existe',
			status: 'not-authenticated',
			user: {},
		});
	});

	test('checkAuthToken debe de fallar si no hay token', async () => {
		// creamos nuestro mockStore y renderizamos el hook
		const mockStore = getMockStore({ ...initialState });
		const { result } = renderHook(() => useAuthStore(), {
			wrapper: ({ children }) => (
				<Provider store={mockStore}>{children}</Provider>
			),
		});
		// hacemos la petición
		await act(async () => {
			await result.current.checkAuthToken();
		});
		// desestructuramos los valores del hook
		const { errorMessage, status, user } = result.current;
		// comprobamos que los valores sean correctos debe que aparecer not-authenticated
		// en el localStorage no debe de haber un token
		expect({ errorMessage, status, user }).toEqual({
			errorMessage: undefined,
			status: 'not-authenticated',
			user: {},
		});
	});

	test('checkAuthToken debe de autenticar el usuario si hay un token', async () => {
		// hacemos la petición para obtener un token y lo guardamos en el localStorage
		const { data } = await calendarApi.post('/auth', testUserCredentials);
		localStorage.setItem('token', data.token);
		// creamos nuestro mockStore y renderizamos el hook
		const mockStore = getMockStore({ ...initialState });
		const { result } = renderHook(() => useAuthStore(), {
			wrapper: ({ children }) => (
				<Provider store={mockStore}>{children}</Provider>
			),
		});
		// hacemos la petición de autenticación de token
		await act(async () => {
			await result.current.checkAuthToken();
		});
		// debe que contener un usuario con el nombre de Pruebas y el uid
		const { errorMessage, status, user } = result.current;
		expect({ errorMessage, status, user }).toEqual({
			errorMessage: undefined,
			status: 'authenticated',
			user: { name: 'Pruebas', uid: '639e4ca0f22f8b5d388e341c' },
		});
	});
});
