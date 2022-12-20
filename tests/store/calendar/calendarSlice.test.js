import {
	calendarSlice,
	onAddNewEvent,
	onDeleteEvent,
	onLoadEvents,
	onLogoutCalendar,
	onSetActiveEvent,
	onUpdateEvent,
} from '../../../src/store/calendar/calendarSlice';
import {
	calendarWithActiveEventState,
	calendarWithEventsState,
	events,
	initialState,
} from '../../fixtures/calendarStates';

describe('Pruebas en calendarSlice', () => {
	test('debe de regresar el estado por defecto', () => {
		// revisamos que el estado inicial sea el que esperamos
		const state = calendarSlice.getInitialState();
		expect(state).toEqual(initialState);
	});

	test('onSetActiveEvent debe de activar el evento', () => {
		// calendarWithEventsState es un estado inicial con eventos
		// el estado inicial no tiene ningún evento activo
		const state = calendarSlice.reducer(
			calendarWithEventsState,
			onSetActiveEvent(events[0])
		);
		// esperamos que el evento activo sea el primer evento del arreglo de eventos
		expect(state.activeEvent).toEqual(events[0]);
	});

	test('onAddNewEvent debe de agregar el evento', () => {
		// creamos un nuevo evento
		const newEvent = {
			id: '3',
			start: new Date('2020-10-21 13:00:00'),
			end: new Date('2020-10-21 15:00:00'),
			title: 'Cumpleaños de Fernando!!',
			notes: 'Alguna nota!!',
		};
		// calendarWithEventsState es un estado inicial con eventos
		// el estado inicial no tiene ningún evento activo
		// mandamos  el estado inicial con eventos y el nuevo evento
		// onAddNewEvent es una acción que se encarga de agregar el evento
		const state = calendarSlice.reducer(
			calendarWithEventsState,
			onAddNewEvent(newEvent)
		);
		// esperamos que el arreglo de eventos contenga el nuevo evento
		expect(state.events).toEqual([...events, newEvent]);
	});

	test('onUpdateEvent debe de actualizar el evento', () => {
		// evento actualizado
		const updatedEvent = {
			id: '1',
			start: new Date('2020-10-21 13:00:00'),
			end: new Date('2020-10-21 15:00:00'),
			title: 'Cumpleaños de Fernando actualizado',
			notes: 'Alguna nota actualizada',
		};
		// calendarWithEventsState es un estado inicial con eventos
		// el estado inicial no tiene ningún evento activo
		// mandamos  el estado inicial con eventos y el evento actualizado
		// onUpdateEvent es una acción que se encarga de actualizar el evento
		const state = calendarSlice.reducer(
			calendarWithEventsState,
			onUpdateEvent(updatedEvent)
		);
		// toContain es una función de jest que nos permite verificar que un arreglo contenga un elemento
		expect(state.events).toContain(updatedEvent);
	});

	test('onDeleteEvent debe de borrar el evento activo', () => {
		// calendarWithActiveEventState
		// mandamos el estado inicial con eventos y el evento activo
		const state = calendarSlice.reducer(
			calendarWithActiveEventState,
			onDeleteEvent()
		);
		// esperamos que el evento activo sea null
		expect(state.activeEvent).toBe(null);
		// esperamos que el arreglo de eventos no contenga el primer evento del arreglo de eventos
		// ya que llamamos a la acción onDeleteEvent
		expect(state.events).not.toContain(events[0]);
	});

	test('onLoadEvents debe de establecer los eventos', () => {
		// initialState
		const state = calendarSlice.reducer(initialState, onLoadEvents(events));
		// esperamos que el estado no esté cargando eventos
		expect(state.isLoadingEvents).toBeFalsy();
		// esperamos que el arreglo de eventos sea igual al arreglo de eventos
		// toEqual es una función de jest que nos permite verificar que dos arreglos sean iguales
		expect(state.events).toEqual(events);
		// hacemos una carga de eventos solamente los eventos nuevos
		const newState = calendarSlice.reducer(state, onLoadEvents(events));
		// esperamos que el arreglo de eventos sea igual al arreglo de eventos
		expect(state.events.length).toBe(events.length);
	});

	test('onLogoutCalendar debe de limpiar el estado', () => {
		// calendarWithActiveEventState
		const state = calendarSlice.reducer(
			calendarWithActiveEventState,
			onLogoutCalendar()
		);
		// esperamos que el estado sea el estado inicial
		expect(state).toEqual(initialState);
	});
});
