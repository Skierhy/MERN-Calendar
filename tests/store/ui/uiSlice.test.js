import {
	onCloseDateModal,
	onOpenDateModal,
	uiSlice,
} from '../../../src/store/ui/uiSlice';

describe('Pruebas en uiSlice', () => {
	test('debe de regresar el estado por defecto', () => {
		// getInitialState() es una función que viene de la librería de redux-toolkit
		// que nos permite obtener el estado inicial de un slice
		expect(uiSlice.getInitialState()).toEqual({ isDateModalOpen: false });
	});

	test('debe de cambiar el isDateModalOpen correctamente', () => {
		// obtenemos el estado inicial
		let state = uiSlice.getInitialState();
		// ejecutamos la acción onOpenDateModal
		// comprobar que el estado cambia correctamente
		state = uiSlice.reducer(state, onOpenDateModal());
		expect(state.isDateModalOpen).toBeTruthy();
		// el caso contrario también debe de funcionar
		state = uiSlice.reducer(state, onCloseDateModal());
		expect(state.isDateModalOpen).toBeFalsy();
	});
});
