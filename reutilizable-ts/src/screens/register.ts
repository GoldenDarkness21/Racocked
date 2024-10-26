import { dispatch } from '../store';
import { navigate } from '../store/actions';
import { Screens } from '../types/navegation';
import { registerUser } from '../utils/firebase';

const credentials = {
    name: '',
	email: '',
	password: ''
};

class Register extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

    changeuName(e: any) {
		credentials.name = e.target.value;
	}

	changeEmail(e: any) {
		credentials.email = e.target.value;
	}

	changePassword(e: any) {
		credentials.password = e.target.value;
	}

	async submitForm() {
		// Pasamos solo email y password como argumentos
		const resp = await registerUser(credentials.email, credentials.password);
		resp ? dispatch(navigate(Screens.LOGIN)) : alert('No se pudo crear el usuario');
	}

	async render() {
		if (this.shadowRoot) {
			const title = this.ownerDocument.createElement('h1');
			title.innerText = 'Registro';
			this.shadowRoot.appendChild(title);

            const uName = this.ownerDocument.createElement('input');
			uName.placeholder = 'User Name';
			uName.addEventListener('change', this.changeuName);
			this.shadowRoot.appendChild(uName);

			const uEmail = this.ownerDocument.createElement('input');
			uEmail.placeholder = 'Email address';
			uEmail.addEventListener('change', this.changeEmail);
			this.shadowRoot.appendChild(uEmail);

			const password = this.ownerDocument.createElement('input');
			password.placeholder = 'Password';
			password.type = 'password'; // Aseguramos que el input sea de tipo password
			password.addEventListener('change', this.changePassword);
			this.shadowRoot.appendChild(password);

			const save = this.ownerDocument.createElement('button');
			save.innerText = 'Register';
			save.addEventListener('click', this.submitForm.bind(this));
			this.shadowRoot.appendChild(save);
		}
	}
}

customElements.define('app-register', Register);
export default Register;
