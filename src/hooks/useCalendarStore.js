import { useDispatch, useSelector } from 'react-redux';
import calendarApi from '../api/calendarApi';
import { convertEventsToDateEvents } from '../helpers';
import {
	onAddNewEvent,
	onDeleteEvent,
	onSetActiveEvent,
	onUpdateEvent,
} from '../store';

export const useCalendarStore = () => {
	const dispatch = useDispatch();
	const { events, activeEvent } = useSelector((state) => state.calendar);
	const { user } = useSelector((state) => state.auth);

	// establecer el evento activo
	const setActiveEvent = (calendarEvent) => {
		dispatch(onSetActiveEvent(calendarEvent));
	};
	// Guardar el evento
	const startSavingEvent = async (calendarEvent) => {
		// Todo update event
		// revisar si el evento tiene un id para ver si es uno nuevo o uno existente
		if (calendarEvent._id) {
			// Actualizando
			dispatch(onUpdateEvent({ ...calendarEvent }));
		} else {
			// Creando
			const { data } = await calendarApi.post('/events', calendarEvent);
			dispatch(
				onAddNewEvent({ ...calendarEvent, id: data.evento.id, user })
			);
		}
	};
	// Eliminar el evento
	const startDeletingEvent = () => {
		// Todo: Llegar al backend

		dispatch(onDeleteEvent());
	};

	// Cargar los eventos
	const startLoadingEvents = async () => {
		try {
			// hacemos la petición y extraemos los datos
			const { data } = await calendarApi.get('/events');
			// convertimos fechas a Date
			const events = convertEventsToDateEvents(data.eventos);
			console.log(events);
		} catch (error) {
			console.log('cargando eventos');
			log.error(error);
		}
	};

	return {
		//* Propiedades
		activeEvent,
		events,
		// Comprobar si hay un evento activo
		// !!activeEvent devuelve true si activeEvent es diferente de null
		hasEventSelected: !!activeEvent,

		//* Métodos
		startDeletingEvent,
		setActiveEvent,
		startSavingEvent,
		startLoadingEvents,
	};
};
