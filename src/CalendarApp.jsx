import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';
import { store } from './store';

export const CalendarApp = () => {
	return (
		<Provider store={store}>
			{/* necesita  BrowserRouter para usar las rutas*/}
			<BrowserRouter>
				{/* renderizar las rutas */}
				<AppRouter />
			</BrowserRouter>
		</Provider>
	);
};
