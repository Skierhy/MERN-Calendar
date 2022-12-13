import { useMemo, useState, useEffect } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import Modal from 'react-modal';

import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import es from 'date-fns/locale/es';
import { useCalendarStore, useUiStore } from '../../hooks';

// se usa para darle el idioma al calendario
registerLocale('es', es);

// customStyles sirve para darle estilo al modal
const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};
// es elemento que se va a renderizar en el modal el principal
// se encuentra en el index.html
Modal.setAppElement('#root');

export const CalendarModal = () => {
	// se usa para abrir y cerrar el modal
	// usando el hook useUiStore
	const { isDateModalOpen, closeDateModal } = useUiStore();
	const { activeEvent, startSavingEvent } = useCalendarStore();

	// se usa para saber si el formulario fue enviado
	const [formSubmitted, setFormSubmitted] = useState(false);
	// se usa para guardar los valores del formulario
	const [formValues, setFormValues] = useState({
		title: '',
		notes: '',
		start: new Date(),
		end: addHours(new Date(), 2),
	});
	// se usa para saber si el titulo esta vació
	const titleClass = useMemo(() => {
		if (!formSubmitted) return '';
		// se usa para saber si el titulo esta vació y darle un estilo
		// si el titulo esta vació se le da el estilo is-invalid
		// si el titulo no esta vació se le da el estilo ''
		return formValues.title.length > 0 ? '' : 'is-invalid';
		// se usa para que se vuelva a renderizar cuando el titulo cambie
		// o cuando el formulario sea enviado
	}, [formValues.title, formSubmitted]);

	useEffect(() => {
		if (activeEvent !== null) {
			setFormValues({ ...activeEvent });
		}
	}, [activeEvent]);
	// se usa para guardar los valores del formulario en el state
	// target.name se usa para saber que input se esta modificando
	// target.value se usa para saber el valor del input
	const onInputChanged = ({ target }) => {
		setFormValues({
			...formValues,
			[target.name]: target.value,
		});
	};
	// event se usa para saber la fecha que se esta modificando
	// changing se usa para saber que input se esta modificando el start o el end
	const onDateChanged = (event, changing) => {
		setFormValues({
			...formValues,
			[changing]: event,
		});
	};
	// se usa para cerrar el modal
	const onCloseModal = () => {
		closeDateModal();
	};
	// se usa para guardar el evento
	const onSubmit = async (event) => {
		event.preventDefault();
		setFormSubmitted(true);
		// se usa para saber la diferencia entre las fechas
		const difference = differenceInSeconds(
			formValues.end,
			formValues.start
		);
		// se usa para saber si la fecha de inicio es mayor a la fecha de fin
		if (isNaN(difference) || difference <= 0) {
			// sweetalert2
			// swal.fire se usa para mostrar un mensaje de error
			Swal.fire(
				'Fechas incorrectas',
				'Revisar las fechas ingresadas',
				'error'
			);
			return;
		}
		// se usa para saber si el titulo esta vació
		if (formValues.title.length <= 0) return;

		console.log(formValues);

		// TODO:
		await startSavingEvent(formValues);
		closeDateModal();
		setFormSubmitted(false);
	};

	// Modal
	// isOpen se usa para saber si el modal esta abierto o cerrado
	// onRequestClose se usa para cerrar el modal
	// className se usa para darle estilo al modal
	// overlayClassName se usa para darle estilo al fondo del modal
	// closeTimeoutMS se usa para darle un tiempo de espera al modal para cerrarse
	return (
		<Modal
			isOpen={isDateModalOpen}
			onRequestClose={onCloseModal}
			style={customStyles}
			className='modal'
			overlayClassName='modal-fondo'
			closeTimeoutMS={200}
		>
			<h1> Nuevo evento </h1>
			<hr />
			<form className='container' onSubmit={onSubmit}>
				<div className='form-group mb-2'>
					<label>Fecha y hora inicio</label>
					{/*
						selected se usa para saber que fecha esta seleccionada
						onChange se usa para saber cuando se cambia la fecha
						className se usa para darle estilo al input
						dateFormat se usa para darle formato a la fecha
						showTimeSelect se usa para mostrar la hora en el calendario seleccionar la hora
						locale se usa para darle el idioma al calendario
						timeCaption se usa para darle el nombre a la hora
					*/}
					<DatePicker
						selected={formValues.start}
						onChange={(event) => onDateChanged(event, 'start')}
						className='form-control'
						dateFormat='Pp'
						showTimeSelect
						locale='es'
						timeCaption='Hora'
					/>
				</div>

				<div className='form-group mb-2'>
					<label>Fecha y hora fin</label>
					{/*
						minDate se usa para saber que fecha es la minima que se puede seleccionar
					*/}
					<DatePicker
						minDate={formValues.start}
						selected={formValues.end}
						onChange={(event) => onDateChanged(event, 'end')}
						className='form-control'
						dateFormat='Pp'
						showTimeSelect
						locale='es'
						timeCaption='Hora'
					/>
				</div>

				<hr />
				<div className='form-group mb-2'>
					<label>Titulo y notas</label>
					<input
						type='text'
						className={`form-control ${titleClass}`}
						placeholder='Título del evento'
						name='title'
						autoComplete='off'
						value={formValues.title}
						onChange={onInputChanged}
					/>
					<small id='emailHelp' className='form-text text-muted'>
						Una descripción corta
					</small>
				</div>

				<div className='form-group mb-2'>
					<textarea
						type='text'
						className='form-control'
						placeholder='Notas'
						rows='5'
						name='notes'
						value={formValues.notes}
						onChange={onInputChanged}
					></textarea>
					<small id='emailHelp' className='form-text text-muted'>
						Información adicional
					</small>
				</div>

				<button
					type='submit'
					className='btn btn-outline-primary btn-block'
				>
					<i className='far fa-save'></i>
					<span> Guardar</span>
				</button>
			</form>
		</Modal>
	);
};
