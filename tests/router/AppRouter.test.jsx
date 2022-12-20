import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CalendarPage } from '../../src/calendar';
import { useAuthStore } from '../../src/hooks/useAuthStore';
import { AppRouter } from '../../src/router/AppRouter';

// hacer un mock de la función que se importa
jest.mock('../../src/hooks/useAuthStore');

// renderizar el calendarPage
jest.mock('../../src/calendar', () => ({
	CalendarPage: () => <h1>CalendarPage</h1>,
}));

describe('Pruebas en <AppRouter />', () => {
	// creamos un jest fn para simular la función que se importa
	const mockCheckAuthToken = jest.fn();
	// limpiar los mocks antes de cada prueba
	beforeEach(() => jest.clearAllMocks());

	test('debe de mostrar la pantalla de carga y llamar checkAuthToken', () => {
		// mock de la función que se importa y retorna un objeto
		useAuthStore.mockReturnValue({
			status: 'checking',
			checkAuthToken: mockCheckAuthToken,
		});
		// renderizar el componente
		render(<AppRouter />);
		// buscar el texto en el documento y verificar que exista
		expect(screen.getByText('Cargando...')).toBeTruthy();
		// verificar que se haya llamado la función
		expect(mockCheckAuthToken).toHaveBeenCalled();
	});

	test('debe de mostrar el login en caso de no estar autenticado', () => {
		// el mock retorna un objeto con el status y la función de un mockCheckAuthToken
		useAuthStore.mockReturnValue({
			status: 'not-authenticated',
			checkAuthToken: mockCheckAuthToken,
		});
		// renderizar el componente
		const { container } = render(
			// se debe de usar el MemoryRouter para poder usar las rutas
			// el initialEntries es para simular la ruta que se quiere probar
			<MemoryRouter initialEntries={['/auth2/algo/otracosa']}>
				<AppRouter />
			</MemoryRouter>
		);
		// buscar el texto en el documento y verificar que exista
		expect(screen.getByText('Ingreso')).toBeTruthy();
		// verificar que el snapshot sea igual al que se tiene
		// se debe que desestructurar el container para usar el snapshot
		expect(container).toMatchSnapshot();
	});

	test('debe de mostrar el calendario si estamos autenticados', () => {
		// el mock retorna un objeto con el status y la función de un mockCheckAuthToken
		useAuthStore.mockReturnValue({
			status: 'authenticated',
			checkAuthToken: mockCheckAuthToken,
		});
		// renderizar el componente
		render(
			<MemoryRouter>
				<AppRouter />
			</MemoryRouter>
		);
		// buscar el texto en el documento y verificar que exista
		expect(screen.getByText('CalendarPage')).toBeTruthy();
	});
});
