export const CalendarEvent = ({ event }) => {
	// recibe el evento y lo desestructura
	// lo que vamos a mostrar en el calendario
	const { title, user } = event;

	return (
		<>
			<strong>{title}</strong>
			<span> - {user.name}</span>
		</>
	);
};
