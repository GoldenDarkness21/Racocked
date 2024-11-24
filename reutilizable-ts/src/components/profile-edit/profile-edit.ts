import styles from '../profile-edit/profile-edit.css';
import { updateUser, updatePassword } from '../../utils/firebase';
import { appState } from '../../store';

class EditProfile extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	async connectedCallback() {
		await this.render();
		this.attachEventListeners();
		console.log('EditProfile component loaded.');
	}

	attachEventListeners() {
		const form = this.shadowRoot?.querySelector('form');
		form?.addEventListener('submit', this.handleSubmit.bind(this));
	}

	async handleSubmit(event: Event) {
		event.preventDefault();

		const { user } = appState;
		if (!user?.userId) {
			alert('No user is currently logged in.');
			return;
		}

		const nameInput = this.shadowRoot?.querySelector('#name') as HTMLInputElement;
		const passwordInput = this.shadowRoot?.querySelector('#password') as HTMLInputElement;

		const updates: { username?: string } = {};
		const newPassword = passwordInput?.value;

		if (nameInput?.value.trim()) {
			updates.username = nameInput.value.trim();
		}

		try {
			if (updates.username) {
				await updateUser(user.userId, updates);
				alert('Username updated successfully.');
			}

			if (newPassword.trim()) {
				await updatePassword(user.userId, newPassword);
				alert('Password updated successfully.');
			}

			nameInput.value = '';
			passwordInput.value = '';
		} catch (error) {
			console.error('Error updating profile:', error);
			alert('Failed to update profile. Please try again.');
		}
	}

	async render() {
		const { user } = appState;

		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
				<section class="container">
					<form class="form" method="post">
						<section class="form-group">
							<label for="name">New Username</label>
							<input type="text" id="name" name="name" placeholder="${user?.displayName || 'Enter new username'}" />
						</section>
						<section class="form-group">
							<label for="password">New Password</label>
							<input type="password" id="password" name="password" placeholder="Enter new password" />
						</section>
						<section class="form-actions">
							<button type="submit" class="edit-profile">Save Changes</button>
						</section>
					</form>
				</section>
			`;

			const style = document.createElement('style');
			style.textContent = styles;
			this.shadowRoot.appendChild(style);
		}
	}
}

customElements.define('edit-profile', EditProfile);
export default EditProfile;
