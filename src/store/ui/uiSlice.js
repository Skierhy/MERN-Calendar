// nuestro slice de modal
import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
	name: 'ui',
	// el estado inicial sera un objeto con la propiedad isDateModalOpen en false
	initialState: {
		isDateModalOpen: false,
	},
	reducers: {
		// abrimos el modal
		onOpenDateModal: (state) => {
			state.isDateModalOpen = true;
		},
		// cerramos el modal
		onCloseDateModal: (state) => {
			state.isDateModalOpen = false;
		},
	},
});

// Action creators are generated for each case reducer function
export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;
