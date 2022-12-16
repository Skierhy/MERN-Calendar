import { useDispatch, useSelector } from 'react-redux';
import { calendarApi } from '../api';
import { clearErrorMessage, onChecking, onLogin, onLogout } from '../store';

export const useAuthStore = () => {
	// usaremos el hook useSelector para poder leer el estado de la store en el state de auth
	const { status, user, errorMessage } = useSelector((state) => state.auth);
	// usaremos el hook useDispatch para poder disparar acciones
	const dispatch = useDispatch();

	// Creamos los métodos que necesitamos para el manejo de la autenticación
	// y los exportamos para que puedan ser usados en cualquier componente
	// que lo requiera
	// startLogin se encarga de hacer la petición al backend para iniciar sesión
	const startLogin = async ({ email, password }) => {
		// disparamos la acción onChecking para cambiar el estado de la store a checking
		dispatch(onChecking());
		// try catch para manejar errores por si la petición falla
		try {
			// hacemos la petición al backend post a /auth y su body es un objeto con email y password
			const { data } = await calendarApi.post('/auth', {
				email,
				password,
			});
			// si la petición es exitosa guardamos el token en el localStorage
			localStorage.setItem('token', data.token);
			// guardamos la fecha en la que se hizo el login para poder hacer la validación del token
			localStorage.setItem('token-init-date', new Date().getTime());
			// disparamos la acción onLogin para cambiar el estado de la store a authenticated
			// y guardamos el nombre y el uid del usuario en el state de la store
			dispatch(onLogin({ name: data.name, uid: data.uid }));
		} catch (error) {
			// si la petición falla disparamos la acción onLogout para cambiar el estado de la store a not-authenticated
			dispatch(onLogout('Credenciales incorrectas'));
			// y después de 10ms disparamos la acción clearErrorMessage para limpiar el mensaje de error
			setTimeout(() => {
				dispatch(clearErrorMessage());
			}, 10);
		}
	};

	// startRegister se encarga de hacer la petición al backend para registrar un nuevo usuario
	const startRegister = async ({ email, password, name }) => {
		// disparamos una acción para que indice que esta revisando el email password y name
		dispatch(onChecking());
		// como es una petición entonces puede fallar
		try {
			// hacemos la petición al backend post a /auth/new y su body es un objeto con email, password y name
			const { data } = await calendarApi.post('/auth/new', {
				email,
				password,
				name,
			});
			// guarda el token en el localStorage
			localStorage.setItem('token', data.token);
			// guarda la fecha en la que se hizo el login para poder hacer la validación del token
			localStorage.setItem('token-init-date', new Date().getTime());
			// disparamos la acción onLogin para cambiar el estado de la store a authenticated
			// y guardamos el nombre y el uid del usuario en el state de la store
			dispatch(onLogin({ name: data.name, uid: data.uid }));
		} catch (error) {
			// disparamos la acción onLogout para cambiar el estado de la store a not-authenticated
			// si no viene un mensaje de error en la respuesta del backend entonces se muestra un mensaje genérico
			dispatch(onLogout(error.response.data?.msg || '--'));
			// y después de 10ms disparamos la acción clearErrorMessage para limpiar el mensaje de error
			setTimeout(() => {
				dispatch(clearErrorMessage());
			}, 10);
		}
	};

	const checkAuthToken = async () => {
		const token = localStorage.getItem('token');
		if (!token) return dispatch(onLogout());

		try {
			const { data } = await calendarApi.get('auth/renew');
			localStorage.setItem('token', data.token);
			localStorage.setItem('token-init-date', new Date().getTime());
			dispatch(onLogin({ name: data.name, uid: data.uid }));
		} catch (error) {
			localStorage.clear();
			dispatch(onLogout());
		}
	};

	const startLogout = () => {
		localStorage.clear();
		dispatch(onLogout());
	};

	return {
		//* Propiedades
		errorMessage,
		status,
		user,

		//* Métodos
		checkAuthToken,
		startLogin,
		startLogout,
		startRegister,
	};
};
