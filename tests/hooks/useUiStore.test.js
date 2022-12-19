import { configureStore } from '@reduxjs/toolkit';
import { act, renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useUiStore } from '../../src/hooks/useUiStore';
import { uiSlice } from '../../src/store';

// Esta función nos permite crear un mockStore
const getMockStore = (initialState) => {
	return configureStore({
		reducer: {
			ui: uiSlice.reducer,
		},
		preloadedState: {
			ui: { ...initialState },
		},
	});
};

describe('Pruebas en useUiStore', () => {
	test('debe de regresar los valores por defecto', () => {
		// Creamos un mockStore con los valores por defecto
		const mockStore = getMockStore({ isDateModalOpen: false });
		// renderHook es una función de testing-library/react-hooks
		// que nos permite renderizar un hook y obtener sus valores
		// el segundo argumento es un objeto que recibe un wrapper
		// que es un componente que envuelve a nuestro hook y regresa un jsx
		const { result } = renderHook(() => useUiStore(), {
			wrapper: ({ children }) => (
				<Provider store={mockStore}>{children}</Provider>
			),
		});
		// result es un objeto que tiene una propiedad llamada current
		// que es donde se encuentran los valores que regresa nuestro hook
		// expect.any es una función de jest que nos permite evaluar
		// que el valor sea de un tipo de dato en específico
		expect(result.current).toEqual({
			isDateModalOpen: false,
			closeDateModal: expect.any(Function),
			openDateModal: expect.any(Function),
			toggleDateModal: expect.any(Function),
		});
	});

	test('openDateModal debe de colocar true en el isDateModalOpen', () => {
		// creamos un mockStore con el valor de isDateModalOpen en false
		const mockStore = getMockStore({ isDateModalOpen: false });
		// renderizamos el hook
		const { result } = renderHook(() => useUiStore(), {
			wrapper: ({ children }) => (
				<Provider store={mockStore}>{children}</Provider>
			),
		});
		// obtenemos la función openDateModal del hook
		// cuando extraemos un valor primitivo se pasa por valor y no por referencia
		// no se recomienda extraer isDateModalOpen porque si se cambia el valor
		const { openDateModal } = result.current;
		// el act es una función de testing-library/react-hooks
		// que nos permite ejecutar acciones que cambien el estado
		act(() => {
			openDateModal();
		});
		// esperamos que el valor de isDateModalOpen sea true
		expect(result.current.isDateModalOpen).toBeTruthy();
	});

	test('closeDateModal debe de colocar false en isDateModalOpen', () => {
		// creamos un mockStore con el valor de isDateModalOpen en true
		// para poder probar que se cambie a false con el closeDateModal
		const mockStore = getMockStore({ isDateModalOpen: true });
		// renderizamos el hook
		const { result } = renderHook(() => useUiStore(), {
			wrapper: ({ children }) => (
				<Provider store={mockStore}>{children}</Provider>
			),
		});
		// obtenemos la función closeDateModal del hook
		// act se usa para ejecutar acciones que cambien el estado
		act(() => {
			result.current.closeDateModal();
		});
		// esperamos que el valor de isDateModalOpen sea false
		expect(result.current.isDateModalOpen).toBeFalsy();
	});

	test('toggleDateModal debe de cambiar el estado respectivamente', () => {
		// creamos un mockStore con el valor de isDateModalOpen en true
		const mockStore = getMockStore({ isDateModalOpen: true });
		// renderizamos el hook
		const { result } = renderHook(() => useUiStore(), {
			wrapper: ({ children }) => (
				<Provider store={mockStore}>{children}</Provider>
			),
		});
		// obtenemos la función toggleDateModal del hook
		// lo que hace la prueba si esta true entonces debe que cambiar a false
		// y si esta false entonces debe de cambiar a true
		act(() => {
			result.current.toggleDateModal();
		});
		expect(result.current.isDateModalOpen).toBeFalsy();

		act(() => {
			result.current.toggleDateModal();
		});
		expect(result.current.isDateModalOpen).toBeTruthy();
	});
});
