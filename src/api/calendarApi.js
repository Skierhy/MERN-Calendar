// importamos axios para hacer las peticiones
import axios from 'axios';
// importamos la función que nos devuelve las variables de entorno
import { getEnvVariables } from '../helpers';

// Obtenemos la variable de entorno
const { VITE_API_URL } = getEnvVariables();

// Creamos una instancia de axios con la url base
const calendarApi = axios.create({
	baseURL: VITE_API_URL,
});

// Todo: configurar interceptores
// interceptores son funciones que se ejecutan antes de que se haga la petición
// lo que  que hace los interceptores es interceptar las peticiones tanto para el back o para el front
// request es la solicitud que se hace al backend
// response es la respuesta que se recibe del backend
calendarApi.interceptors.request.use((config) => {
	// config es el objeto de configuración de la petición
	// config.headers es el objeto de headers de la petición
	config.headers = {
		// ...config.headers es una forma de hacer un spread de los headers que ya existen
		...config.headers,
		// obtenemos el token del localStorage y lo agregamos al header de la petición
		'x-token': localStorage.getItem('token'),
	};
	return config;
});

export default calendarApi;
