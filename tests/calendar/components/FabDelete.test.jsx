import { fireEvent, render, screen } from '@testing-library/react';
import { FabDelete } from '../../../src/calendar/components/FabDelete';
import { useCalendarStore } from '../../../src/hooks/useCalendarStore';

// creamos nuestro mock
// los mocks son funciones que simulan el comportamiento de una función real
jest.mock('../../../src/hooks/useCalendarStore');

describe('Pruebas en <FabDelete />', () => {
	// creamos una función que simula el comportamiento de la función real
	const mockStartDeletingEvent = jest.fn();
	// limpiamos los mocks
	beforeEach(() => jest.clearAllMocks());

	test('debe de mostrar el componente correctamente', () => {
		// simulamos el comportamiento de la función real
		// en este caso, la función real retorna un objeto
		useCalendarStore.mockReturnValue({
			hasEventSelected: false,
		});

		render(<FabDelete />);

		const btn = screen.getByLabelText('btn-delete');
		// console.log(btn.classList.toString());
		// revisamos que contenga estas clases en el componente
		expect(btn.classList).toContain('btn');
		expect(btn.classList).toContain('btn-danger');
		expect(btn.classList).toContain('fab-danger');
		// el display del boton sea none
		expect(btn.style.display).toBe('none');
	});

	test('debe de mostrar el botón si hay un evento activo', () => {
		// lo que va a retornar el mock de la función real
		useCalendarStore.mockReturnValue({
			hasEventSelected: true,
		});
		// renderizamos el componente
		render(<FabDelete />);
		// obtenemos el botón por su label
		const btn = screen.getByLabelText('btn-delete');
		// console.log(btn.classList.toString());
		// no debe que aparecer el display none
		// debe que estar vació
		expect(btn.style.display).toBe('');
	});

	test('debe de llamar startDeletingEvent si hay evento activo', () => {
		// simulamos el comportamiento de la función real
		// el cual retorna un objeto
		// hasEventSelected: true
		// startDeletingEvent: mockStartDeletingEvent
		// startDeletingEvent es una función que simula el comportamiento de la función real
		// con el uso de un mock
		useCalendarStore.mockReturnValue({
			hasEventSelected: true,
			startDeletingEvent: mockStartDeletingEvent,
		});
		// renderizamos el componente
		render(<FabDelete />);
		// obtenemos el botón por su label
		const btn = screen.getByLabelText('btn-delete');
		// simulamos el click en el botón
		fireEvent.click(btn);
		// debe que haber sido llamado la función mockStartDeletingEvent
		expect(mockStartDeletingEvent).toHaveBeenCalledWith();
	});
});
