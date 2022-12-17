import { parseISO } from 'date-fns';

export const convertEventsToDateEvents = (events = []) => {
	// parseISO sirve para convertir un string a un objeto de tipo Date
	// lo que hace el .map es recorrer el array de eventos y para cada evento
	// le asigna el valor de la propiedad end y start a un objeto de tipo Date
	return events.map((event) => {
		event.end = parseISO(event.end);
		event.start = parseISO(event.start);
		return event;
	});
};
