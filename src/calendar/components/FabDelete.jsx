import { useCalendarStore, useUiStore } from '../../hooks';

// este componente es el botón de eliminar evento
export const FabDelete = () => {
	const { startDeletingEvent, hasEventSelected } = useCalendarStore();

	const handleDelete = () => {
		// se llama a la acción que elimina el evento
		startDeletingEvent();
	};

	return (
		<button
			className='btn btn-danger fab-danger'
			onClick={handleDelete}
			// si no hay evento seleccionado, el botón no se muestra
			style={{
				display: hasEventSelected ? '' : 'none',
			}}
		>
			<i className='fas fa-trash-alt'></i>
		</button>
	);
};
