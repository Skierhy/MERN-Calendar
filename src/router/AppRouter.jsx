import { Navigate, Route, Routes } from 'react-router-dom';

import { LoginPage } from '../auth';
import { CalendarPage } from '../calendar';

export const AppRouter = () => {
	const authStatus = 'authenticated'; // 'authenticated'; // 'not-authenticated';

	return (
		// routes sirve para renderizar las rutas
		<Routes>
			{/* checa si esta autentificado */}
			{authStatus === 'not-authenticated' ? (
				// estarán aquí las rutas que no requieren autenticación
				// login y register
				<Route path='/auth/*' element={<LoginPage />} />
			) : (
				// estarán aquí las rutas que requieren autenticación
				// calendar
				<Route path='/*' element={<CalendarPage />} />
			)}
			{/* si no encuentra la ruta se va a direccional a  /auth/login*/}
			{/* cuando no estas  authenticated siempre te mostrara login es una prueba de fallos*/}
			<Route path='/*' element={<Navigate to='/auth/login' />} />
		</Routes>
	);
};
