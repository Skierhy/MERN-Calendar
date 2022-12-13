import { useDispatch, useSelector } from 'react-redux';
import {
	onAddNewEvent,
	onDeleteEvent,
	onSetActiveEvent,
	onUpdateEvent,
} from '../store';

export const useCalendarStore = () => {
	const dispatch = useDispatch();
	const { events, activeEvent } = useSelector((state) => state.calendar);

	// establecer el evento activo
	const setActiveEvent = (calendarEvent) => {
		dispatch(onSetActiveEvent(calendarEvent));
	};
	// Guardar el evento
	const startSavingEvent = async (calendarEvent) => {
		// TODO: llegar al backend

		// Todo bien
		// revisar si el evento tiene un id para ver si es uno nuevo o uno existente
		if (calendarEvent._id) {
			// Actualizando
			dispatch(onUpdateEvent({ ...calendarEvent }));
		} else {
			// Creando
			dispatch(
				onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() })
			);
		}
	};

	const startDeletingEvent = () => {
		// Todo: Llegar al backend

		dispatch(onDeleteEvent());
	};

	return {
		//* Propiedades
		activeEvent,
		events,
		hasEventSelected: !!activeEvent,

		//* Métodos
		startDeletingEvent,
		setActiveEvent,
		startSavingEvent,
	};
};
