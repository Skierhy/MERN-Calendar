import { useDispatch, useSelector } from 'react-redux';
import { onCloseDateModal, onOpenDateModal } from '../store';

export const useUiStore = () => {
	// Extraemos el dispatch
	const dispatch = useDispatch();

	// Extraemos las propiedades del store
	const { isDateModalOpen } = useSelector((state) => state.ui);

	// abrimos el modal
	const openDateModal = () => {
		dispatch(onOpenDateModal());
	};

	// cerramos el modal
	const closeDateModal = () => {
		dispatch(onCloseDateModal());
	};

	// alternamos el modal
	const toggleDateModal = () => {
		isDateModalOpen ? openDateModal() : closeDateModal();
	};

	return {
		//* Propiedades
		isDateModalOpen,

		//* Métodos
		closeDateModal,
		openDateModal,
		toggleDateModal,
	};
};
