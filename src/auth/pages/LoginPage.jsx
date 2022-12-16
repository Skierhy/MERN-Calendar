import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore } from '../../hooks';
import { useForm } from '../../hooks/useForm';
import './LoginPage.css';

// usaremos dos formularios, uno para el login y otro para el registro
// por lo que usaremos dos objetos para almacenar los campos de cada formulario
// login
const loginFormFields = {
	loginEmail: '',
	loginPassword: '',
};

// registro
const registerFormFields = {
	registerName: '',
	registerEmail: '',
	registerPassword: '',
	registerPassword2: '',
};

export const LoginPage = () => {
	// useAuthStore es un hook que nos permite hacer las peticiones al backend sin usar tonks
	const { startLogin, errorMessage, startRegister } = useAuthStore();
	// onLoginInputChange y onRegisterInputChange son funciones que se encargan de actualizar el estado de los campos de los formularios
	const {
		loginEmail,
		loginPassword,
		onInputChange: onLoginInputChange,
	} = useForm(loginFormFields);
	const {
		registerEmail,
		registerName,
		registerPassword,
		registerPassword2,
		onInputChange: onRegisterInputChange,
	} = useForm(registerFormFields);

	const loginSubmit = (event) => {
		event.preventDefault();
		// debes que mandar el email y la contraseña al backend
		// usando email: y password: como llaves
		startLogin({ email: loginEmail, password: loginPassword });
	};

	const registerSubmit = (event) => {
		event.preventDefault();
		if (registerPassword !== registerPassword2) {
			Swal.fire(
				'Error en registro',
				'Las contraseñas no coinciden',
				'error'
			);
			return;
		}
		startRegister({
			email: registerEmail,
			password: registerPassword,
			name: registerName,
		});
	};

	useEffect(() => {
		if (errorMessage !== undefined) {
			Swal.fire('Error en la autenticación', errorMessage, 'error');
		}
	}, [errorMessage]);

	return (
		<div className='container login-container'>
			<div className='row'>
				<div className='col-md-6 login-form-1'>
					<h3>Ingreso</h3>
					<form onSubmit={loginSubmit}>
						<div className='form-group mb-2'>
							<input
								type='text'
								className='form-control'
								placeholder='Correo'
								name='loginEmail'
								value={loginEmail}
								onChange={onLoginInputChange}
							/>
						</div>
						<div className='form-group mb-2'>
							<input
								type='password'
								className='form-control'
								placeholder='Contraseña'
								name='loginPassword'
								value={loginPassword}
								onChange={onLoginInputChange}
							/>
						</div>
						<div className='d-grid gap-2'>
							<input
								type='submit'
								className='btnSubmit'
								value='Login'
							/>
						</div>
					</form>
				</div>
				{/* ----------------------------------- */}
				<div className='col-md-6 login-form-2'>
					<h3>Registro</h3>
					<form onSubmit={registerSubmit}>
						<div className='form-group mb-2'>
							<input
								type='text'
								className='form-control'
								placeholder='Nombre'
								name='registerName'
								value={registerName}
								onChange={onRegisterInputChange}
							/>
						</div>
						<div className='form-group mb-2'>
							<input
								type='email'
								className='form-control'
								placeholder='Correo'
								name='registerEmail'
								value={registerEmail}
								onChange={onRegisterInputChange}
							/>
						</div>
						<div className='form-group mb-2'>
							<input
								type='password'
								className='form-control'
								placeholder='Contraseña'
								name='registerPassword'
								value={registerPassword}
								onChange={onRegisterInputChange}
							/>
						</div>

						<div className='form-group mb-2'>
							<input
								type='password'
								className='form-control'
								placeholder='Repita la contraseña'
								name='registerPassword2'
								value={registerPassword2}
								onChange={onRegisterInputChange}
							/>
						</div>

						<div className='d-grid gap-2'>
							<input
								type='submit'
								className='btnSubmit'
								value='Crear cuenta'
							/>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
