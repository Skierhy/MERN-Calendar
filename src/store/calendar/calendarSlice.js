import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

// Temporal event por que se va a leer del backend
const tempEvent = {
	_id: new Date().getTime(),
	title: 'Cumpleaños del Jefe',
	notes: 'Hay que comprar el pastel',
	start: new Date(),
	end: addHours(new Date(), 2),
	bgColor: '#fafafa',
	user: {
		_id: '123',
		name: 'Fernando',
	},
};

export const calendarSlice = createSlice({
	name: 'calendar',
	initialState: {
		events: [tempEvent],
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
				if (event._id === payload._id) {
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
					(event) => event._id !== state.activeEvent._id
				);
				// Establecer el evento activo en null
				state.activeEvent = null;
			}
		},
	},
});

// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } =
	calendarSlice.actions;
