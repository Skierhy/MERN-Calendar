import { addHours } from 'date-fns';
import { useCalendarStore, useUiStore } from '../../hooks';

export const FabAddNew = () => {
	const { openDateModal } = useUiStore();
	const { setActiveEvent } = useCalendarStore();

	const handleClickNew = () => {
		// se crea un nuevo evento en el calendario vació
		setActiveEvent({
			title: '',
			notes: '',
			start: new Date(),
			end: addHours(new Date(), 2),
			bgColor: '#fafafa',
			user: {
				_id: '123',
				name: 'Fernando',
			},
		});
		openDateModal();
	};
	// nuevo evento en el calendario
	return (
		<button className='btn btn-primary fab' onClick={handleClickNew}>
			<i className='fas fa-plus'></i>
		</button>
	);
};
