export const Navbar = () => {
	// crear un componente funcional
	// sobre un navbar
	return (
		// donde se muestra el nombre del usuario
		<div className='navbar navbar-dark bg-dark mb-4 px-4'>
			<span className='navbar-brand'>
				<i className='fas fa-calendar-alt'></i>
				&nbsp; Skierhy
			</span>
			{/* el botón de salir */}
			<button className='btn btn-outline-danger'>
				<i className='fas fa-sign-out-alt'></i>
				<span>Salir</span>
			</button>
		</div>
	);
};
