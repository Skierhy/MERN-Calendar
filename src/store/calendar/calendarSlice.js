import { createSlice } from '@reduxjs/toolkit';

export const calendarSlice = createSlice({
	name: 'calendar',
	initialState: {
		isLoadingEvents: true,
		events: [],
		activeEvent: null,
	},
	reducers: {
		// reducer para establecer el evento activo
		onSetActiveEvent: (state, { payload }) => {
			state.activeEvent = payload;
		},
		// reducer para agregar un nuevo evento
		// y establecer el evento activo en null
		onAddNewEvent: (state, { payload }) => {
			state.events.push(payload);
			state.activeEvent = null;
		},
		// reducer para actualizar un evento
		onUpdateEvent: (state, { payload }) => {
			// Buscar el evento en el arreglo de eventos
			state.events = state.events.map((event) => {
				// Si el id del evento es igual al id del payload
				// entonces reemplazar el evento con el payload
				if (event.id === payload.id) {
					return payload;
				}

				return event;
			});
		},
		// reducer para eliminar un evento
		onDeleteEvent: (state) => {
			// Si hay un evento activo esa vamos a eliminarlo
			if (state.activeEvent) {
				// Filtrar el arreglo de eventos y eliminar el evento activo
				state.events = state.events.filter(
					(event) => event.id !== state.activeEvent.id
				);
				// Establecer el evento activo en null
				state.activeEvent = null;
			}
		},
		// reducer para cargar los eventos
		onLoadEvents: (state, { payload = [] }) => {
			state.isLoadingEvents = false;
			// state.events = payload;
			/* Comprobando si el evento existe en la base de datos. */
			payload.forEach((event) => {
				// some() devuelve true si al menos un elemento del arreglo cumple con la condición
				const exists = state.events.some(
					(dbEvent) => dbEvent.id === event.id
				);
				// Si el evento no existe en la base de datos
				// entonces agregarlo al arreglo de eventos
				if (!exists) {
					state.events.push(event);
				}
			});
		},
		onLogoutCalendar: (state) => {
			state.isLoadingEvents = true;
			state.events = [];
			state.activeEvent = null;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	onSetActiveEvent,
	onAddNewEvent,
	onUpdateEvent,
	onDeleteEvent,
	onLoadEvents,
	onLogoutCalendar,
} = calendarSlice.actions;
