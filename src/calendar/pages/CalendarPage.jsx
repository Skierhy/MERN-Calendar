import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import {
	Navbar,
	CalendarEvent,
	CalendarModal,
	FabAddNew,
	FabDelete,
} from '../';

import { localizer, getMessagesES } from '../../helpers';
import { useUiStore, useCalendarStore } from '../../hooks';

export const CalendarPage = () => {
	const { openDateModal } = useUiStore();
	const { events, setActiveEvent } = useCalendarStore();

	const [lastView, setLastView] = useState(
		localStorage.getItem('lastView') || 'week'
	);

	// eventStyleGetter sirve para darle estilo a los eventos
	// el evento se refiere al evento que se esta pintando en el calendario
	const eventStyleGetter = (event, start, end, isSelected) => {
		// style es el objeto que se le va a dar al evento
		const style = {
			backgroundColor: '#347CF7',
			borderRadius: '0px',
			opacity: 0.8,
			color: 'white',
		};

		return {
			style,
		};
	};

	// onDoubleClick sirve para abrir el modal cuando se da doble click en un evento
	const onDoubleClick = (event) => {
		// console.log({ doubleClick: event });
		openDateModal();
	};
	// onselect sirve para seleccionar un evento
	const onSelect = (event) => {
		// console.log({ click: event });
		setActiveEvent(event);
	};
	// onViewChanged sirve para cambiar la vista del calendario
	// y guardarla en el localstorage
	const onViewChanged = (event) => {
		localStorage.setItem('lastView', event);
		setLastView(event);
	};

	return (
		<>
			<Navbar />
			{/*
			culture sirve para cambiar el idioma al calendario
			messages sirve para poner los mensajes en espanol
			eventPropGetter sirve para darle estilo a los eventos
			components sirve para cambiar el componente que se va a pintar en el calendario
			onDoubleClickEvent sirve para abrir el modal cuando se da doble click en un evento
			onSelectEvent sirve para seleccionar un evento
			onView sirve para cambiar la vista del calendario
			 */}
			<Calendar
				culture='es'
				localizer={localizer}
				events={events}
				defaultView={lastView}
				startAccessor='start'
				endAccessor='end'
				style={{ height: 'calc( 100vh - 80px )' }}
				messages={getMessagesES()}
				eventPropGetter={eventStyleGetter}
				components={{
					event: CalendarEvent,
				}}
				onDoubleClickEvent={onDoubleClick}
				onSelectEvent={onSelect}
				onView={onViewChanged}
			/>

			<CalendarModal />

			<FabAddNew />
			<FabDelete />
		</>
	);
};
