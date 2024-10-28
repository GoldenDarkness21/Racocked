// import { dispatch } from '../../store';
// import { navigate } from '../../store/actions';
// import { Screens } from '../../types/navegation';
// import { loginUser } from '../../utils/firebase';
// import styles from './styles.css';

// const credentials = {
// 	email: '',
// 	password: '',
// };

// class Login extends HTMLElement {
// 	constructor() {
// 		super();
// 		this.attachShadow({ mode: 'open' });

// 		// Crear y agregar el estilo
// 		const style = document.createElement('style');
// 		style.textContent = styles; // Asume que el CSS se está importando como una cadena
// 		this.shadowRoot?.appendChild(style);
// 	}

// 	connectedCallback() {
// 		this.render();
// 	}

// 	changeEmail(e: any) {
// 		credentials.email = e.target.value;
// 	}

// 	changePassword(e: any) {
// 		credentials.password = e.target.value;
// 	}

// 	async submitForm() {
//         //aqui usamos la utilidad de login user no la de register
// 		const resp = await loginUser(credentials.email, credentials.password);
// 		resp ? dispatch(navigate(Screens.DASHBOARD)) : alert('Credenciales incorrectas o usuario no existe');
// 	}
//     async changeScreen() {
//         dispatch(navigate(Screens.REGISTER));
//     }

// 	async render() {
// 		if (this.shadowRoot) {

//             //boton superior para permanecer en la pantalla
//             const login = this.ownerDocument.createElement('button');
// 			login.innerText = 'Login';
// 			this.shadowRoot.appendChild(login); 


//             //boton superior para ir al register
//             const signUp = this.ownerDocument.createElement('button');
// 			signUp.innerText = 'Sign up';
// 			signUp.addEventListener('click', this.changeScreen);
// 			this.shadowRoot.appendChild(signUp); 

// 			const title = this.ownerDocument.createElement('h1');
// 			title.innerText = 'Welcome Back';
// 			this.shadowRoot.appendChild(title);
//             title.classList.add('title');

// 			const uName = this.ownerDocument.createElement('input');
// 			uName.placeholder = 'Correo electronico';
// 			uName.addEventListener('change', this.changeEmail);
// 			this.shadowRoot.appendChild(uName);
//             uName.classList.add('uName');


// 			const uPassword = this.ownerDocument.createElement('input');
// 			uPassword.placeholder = 'Contraseña';
// 			uPassword.addEventListener('change', this.changePassword);
// 			this.shadowRoot.appendChild(uPassword);
//             uPassword.classList.add('password');

//             //boton inferior ir al dashboard
// 			const login1 = this.ownerDocument.createElement('button');
// 			login1.innerText = 'Login';
// 			login1.addEventListener('click', this.submitForm);
// 			this.shadowRoot.appendChild(login1);
//             login1.classList.add('login1');

// 		}
// 	}
// }

// customElements.define('app-login', Login);
// export default Login;


import { dispatch } from '../../store';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/navegation';
import { loginUser } from '../../utils/firebase';
import styles from './styles.css';

const credentials = {
	email: '',
	password: '',
};

class Login extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });

		// Crear y agregar el estilo
		const style = document.createElement('style');
		style.textContent = styles; // Asume que el CSS se está importando como una cadena
		this.shadowRoot?.appendChild(style);
	}

	connectedCallback() {
		this.render();
	}

	changeEmail(e: any) {
		credentials.email = e.target.value;
	}

	changePassword(e: any) {
		credentials.password = e.target.value;
	}

	async submitForm() {
        //aqui usamos la utilidad de login user no la de register
		const resp = await loginUser(credentials.email, credentials.password);
		resp ? dispatch(navigate(Screens.DASHBOARD)) : alert('Credenciales incorrectas o usuario no existe');
	}
    async changeScreen() {
        dispatch(navigate(Screens.REGISTER));
    }
// Dentro de la función render()
async render() {
	if (this.shadowRoot) {
		const section1 = this.ownerDocument.createElement('section');
		section1.classList.add('image-section');

		const section2 = this.ownerDocument.createElement('section');
		section2.classList.add('form-section');

		const section3 = this.ownerDocument.createElement('section'); 
		section3.classList.add('principal-section');

		// Agregar la primera y segunda sección dentro de section3 y la 3 al shadowroot
		section3.appendChild(section1);
		section3.appendChild(section2);
		this.shadowRoot.appendChild(section3);

		// Crear contenedor para los botones
		const buttonContainer = this.ownerDocument.createElement('div');
		buttonContainer.classList.add('button-container');

		

		// Botón para iniciar sesión
		const loginButton = this.ownerDocument.createElement('button');
		loginButton.innerText = 'Login';
		loginButton.addEventListener('click', this.submitForm.bind(this));
		buttonContainer.appendChild(loginButton);
		loginButton.classList.add('login');

		// Botón para ir a register
		const registerButton = this.ownerDocument.createElement('button');
		registerButton.innerText = 'Sign Up';
		registerButton.addEventListener('click', this.changeScreen);
		buttonContainer.appendChild(registerButton);
		registerButton.classList.add('signUp');

		// Agregar el contenedor de botones a la sección 2
		section2.appendChild(buttonContainer);


		// Título del formulario
		const title = this.ownerDocument.createElement('h1');
		title.innerText = 'Welcome back';
		section2.appendChild(title);
		title.classList.add('title');

		// Campo de email
		const emailLabel = this.ownerDocument.createElement('label');
		emailLabel.innerText = 'Email';
		section2.appendChild(emailLabel);
		emailLabel.classList.add('label');

		const uEmail = this.ownerDocument.createElement('input');
		uEmail.placeholder = 'Email';
		uEmail.addEventListener('input', this.changeEmail.bind(this));
		section2.appendChild(uEmail);
		uEmail.classList.add('formfield');

		// Campo de contraseña
		const passwordLabel = this.ownerDocument.createElement('label');
		passwordLabel.innerText = 'Password';
		section2.appendChild(passwordLabel);
		passwordLabel.classList.add('label');

		const password = this.ownerDocument.createElement('input');
		password.placeholder = 'Password';
		password.type = 'password'; // Aseguramos que el input sea de tipo password
		password.addEventListener('input', this.changePassword.bind(this));
		section2.appendChild(password);
		password.classList.add('formfield');


		
        //boton inferior ir al dashboard
		const login1 = this.ownerDocument.createElement('button');
		login1.innerText = 'Login';
		login1.addEventListener('click', this.submitForm);
		section2.appendChild(login1);
        login1.classList.add('login1');

	}
}
}

customElements.define('app-login', Login);
export default Login;