import { dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import esES from 'date-fns/locale/es';

// locales sirve para cambiar el idioma del calendario
// en este caso se usa el español
const locales = {
	es: esES,
};

// Se exporta la función localizer para poder usarla en el componente
// dateFnsLocalizer sirve para usar la librería date-fns
export const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek,
	getDay,
	locales,
});
