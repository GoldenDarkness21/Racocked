import { getUserData, updateUser, updateEmail, updatePassword } from '../../utils/firebase';
import { appState } from '../../store';

export default class EditProfile extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	async connectedCallback() {
		await this.render();
		this.attachEventListeners();
	}

	attachEventListeners() {
		const form = this.shadowRoot?.querySelector('form');
		form?.addEventListener('submit', this.handleSubmit.bind(this));

		const passwordInput = this.shadowRoot?.querySelector('#password') as HTMLInputElement;
		passwordInput?.addEventListener('change', this.validatePassword.bind(this));
	}

	validatePassword(e: Event) {
		const password = (e.target as HTMLInputElement)?.value;
		if (password && password.length < 8) {
			alert('Password must be at least 8 characters long.');
		}
	}

	async handleSubmit(event: Event) {
		event.preventDefault();

		// Extraemos correctamente el userId del objeto appState.user
		const userId = appState.user?.userId; // Aseguramos que appState.user tenga la propiedad userId
		if (!userId) {
			alert('Error: No user ID found in appState.');
			return;
		}

		const nameInput = this.shadowRoot?.querySelector('#name') as HTMLInputElement;
		const emailInput = this.shadowRoot?.querySelector('#email') as HTMLInputElement;
		const passwordInput = this.shadowRoot?.querySelector('#password') as HTMLInputElement;

		const updatedData: { username?: string; email?: string; password?: string } = {};

		if (nameInput?.value) {
			updatedData.username = nameInput.value;
		}

		if (emailInput?.value) {
			updatedData.email = emailInput.value;
		}

		if (passwordInput?.value) {
			updatedData.password = passwordInput.value;
		}

		// Validamos el formulario antes de proceder
		if (this.isFormValid(updatedData)) {
			try {
				if (updatedData.username) await updateUser(userId, { username: updatedData.username });
				if (updatedData.email) await updateEmail(userId, updatedData.email);
				if (updatedData.password) await updatePassword(userId, updatedData.password);
				alert('Profile updated successfully');
			} catch (error) {
				console.error('Error updating profile:', error);
				alert('An error occurred while updating your profile.');
			}
		}
	}

	isFormValid(data: { username?: string; email?: string; password?: string }): boolean {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (data.email && !emailRegex.test(data.email)) {
			alert('Please enter a valid email address.');
			return false;
		}

		if (data.password && data.password.length < 8) {
			alert('Password must be at least 8 characters long.');
			return false;
		}

		return true;
	}

	async render() {
		// Obtenemos los datos del usuario
		const userData = await getUserData();
		if (!userData) {
			alert('Error: Could not load user data.');
			return;
		}

		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = /*html*/ `
                <section class="container">
					<form class="form" method="post">
						<section class="form-group">
							<label for="name">Username</label>
							<br>
							<input type="text" id="name" name="name" placeholder="${userData.displayName}">
						</section>
						<section class="form-group">
							<label for="email">Email</label>
							<br>
							<input type="email" id="email" name="email" placeholder="${userData.email}">
						</section>
						<section class="form-group">
							<label for="password">Password</label>
							<br>
							<input type="password" id="password" name="password" placeholder="Enter new password">
						</section>
						<section class="form-actions">
							<br>
							<button type="submit" class="edit-profile">Save Changes</button>
						</section>
					</form>
				</section>
            `;

			const cssIndex = this.ownerDocument.createElement('style');
			this.shadowRoot?.appendChild(cssIndex);
		}
	}
}

customElements.define('edit-profile', EditProfile);
