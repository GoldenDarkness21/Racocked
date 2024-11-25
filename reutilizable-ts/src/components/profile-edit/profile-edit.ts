import styles from '../profile-edit/profle-edit.css';
import { updatePassword } from '../../utils/firebase';
import { appState } from '../../store';

export default class EditProfile extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	async connectedCallback(): Promise<void> {
		await this.render();
		this.attachEventListeners();
		console.log('component rendered');
	}

	attachEventListeners(): void {
		const form = this.shadowRoot?.querySelector('form');
		form?.addEventListener('submit', this.handleSubmit.bind(this));
	}

	async handleSubmit(event: Event): Promise<void> {
		event.preventDefault();
	
		const passwordInput = this.shadowRoot?.querySelector('#new-password') as HTMLInputElement;
		const confirmPasswordInput = this.shadowRoot?.querySelector('#confirm-password') as HTMLInputElement;
	
		const newPassword = passwordInput?.value;
		const confirmPassword = confirmPasswordInput?.value;
	
		if (!newPassword || !confirmPassword) {
			alert('Both password fields are required.');
			return;
		}
	
		if (newPassword !== confirmPassword) {
			alert('Passwords do not match.');
			return;
		}
	
		try {
			
			const userId = appState.user?.userId; 
			if (userId) {
				await updatePassword(userId, newPassword); 
				alert('Password updated successfully.');
			} else {
				alert('User not logged in.');
			}
		} catch (error) {
			console.error('Error updating password:', error);
			alert('Failed to update password. Please try again.');
		}
	}
	
	async render(): Promise<void> {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = /*html*/ `
                <section class="container">
					<form class="form" method="post">
						<section class="form-group">
							<label for="new-password">New Password</label>
							<br>
							<input type="password" id="new-password" name="new-password" placeholder="Enter new password">
						</section>
						<section class="form-group">
							<label for="confirm-password">Confirm Password</label>
							<br>
							<input type="password" id="confirm-password" name="confirm-password" placeholder="Confirm new password">
						</section>
						<section class="form-actions">
							<br>
							<button type="submit" class="update-password">Update Password</button>
						</section>
					</form>
				</section>
            `;

			const cssIndex = this.ownerDocument.createElement('style');
			cssIndex.innerHTML = styles;
			this.shadowRoot?.appendChild(cssIndex);
		}
	}
}

customElements.define('edit-profile', EditProfile);
