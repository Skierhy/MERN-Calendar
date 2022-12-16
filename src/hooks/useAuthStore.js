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
			localStorage.setItem('token-init-date', new Date().getTime());
			dispatch(onLogin({ name: data.name, uid: data.uid }));
		} catch (error) {
			dispatch(onLogout('Credenciales incorrectas'));
			setTimeout(() => {
				dispatch(clearErrorMessage());
			}, 10);
		}
	};

	const startRegister = async ({ email, password, name }) => {
		dispatch(onChecking());
		try {
			const { data } = await calendarApi.post('/auth/new', {
				email,
				password,
				name,
			});
			localStorage.setItem('token', data.token);
			localStorage.setItem('token-init-date', new Date().getTime());
			dispatch(onLogin({ name: data.name, uid: data.uid }));
		} catch (error) {
			dispatch(onLogout(error.response.data?.msg || '--'));
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
