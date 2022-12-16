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
calendarApi.interceptors.request.use((config) => {
	config.headers = {
		...config.headers,
		'x-token': localStorage.getItem('token'),
	};

	return config;
});

export default calendarApi;
