import calendarApi from '../../src/api/calendarApi';

describe('Pruebas en el CalendarApi', () => {
	test('debe de tener la configuración por defecto', () => {
		// calendarApi es un objeto
		// console.log(calendarApi);
		// console.log(process.env)

		// comprobar que el baseURL sea igual al de la variable de entorno
		expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL);
	});
	// interceptores
	test('debe de tener el x-token en el header de todas las peticiones ', async () => {
		// creamos el token y lo guardamos en el localStorage
		const token = 'ABC-123-XYZ';
		localStorage.setItem('token', token);
		// hacemos una petición
		const res = await calendarApi.get('/auth');
		// comprobamos que en el header de la petición se encuentre el x-token
		// res.config.headers es un objeto
		// el uso de [] es para acceder a una propiedad de un objeto
		expect(res.config.headers['x-token']).toBe(token);
	});
});
