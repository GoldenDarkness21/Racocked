import { getUserData, updateUser, updateEmail, updatePassword } from '../../utils/firebase';
import { appState } from '../../store';

class EditProfile extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	async connectedCallback() {
		console.log("EditProfile connectedCallback called");
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
		console.log("Form submitted");

		const userId = appState.user?.userId;
		if (!userId) {
			alert('Error: No user ID found in appState.');
			return;
		}

		const nameInput = this.shadowRoot?.querySelector('#name') as HTMLInputElement;
		const emailInput = this.shadowRoot?.querySelector('#email') as HTMLInputElement;
		const passwordInput = this.shadowRoot?.querySelector('#password') as HTMLInputElement;

		const updatedData: { username?: string; email?: string; password?: string } = {};

		if (nameInput?.value) updatedData.username = nameInput.value;
		if (emailInput?.value) updatedData.email = emailInput.value;
		if (passwordInput?.value) updatedData.password = passwordInput.value;

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
		try {
			const userData = await getUserData();
			console.log("User data loaded:", userData);

			if (!userData) {
				this.shadowRoot!.innerHTML = "<p>Error: Could not load user data.</p>";
				return;
			}

			this.shadowRoot!.innerHTML = /*html*/ `
				<style>
					:host {
						display: block;
						max-width: 400px;
						margin: 0 auto;
						padding: 20px;
						font-family: Arial, sans-serif;
						background: #f9f9f9;
						border: 1px solid #ddd;
						border-radius: 8px;
						box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
					}
					.container {
						text-align: center;
					}
					.form-group {
						margin-bottom: 15px;
					}
					label {
						display: block;
						font-weight: bold;
						margin-bottom: 5px;
					}
					input {
						width: 100%;
						padding: 8px;
						font-size: 1rem;
						border: 1px solid #ccc;
						border-radius: 4px;
					}
					.form-actions {
						text-align: center;
					}
					button {
						background-color: #007bff;
						color: #fff;
						border: none;
						padding: 10px 15px;
						font-size: 1rem;
						border-radius: 4px;
						cursor: pointer;
					}
					button:hover {
						background-color: #0056b3;
					}
				</style>
				<h1>Edit Profile</h1>
				<section class="container">
					<form class="form" method="post">
						<section class="form-group">
							<label for="name">Username</label>
							<input type="text" id="name" name="name" value="${userData.displayName || ''}">
						</section>
						<section class="form-group">
							<label for="email">Email</label>
							<input type="email" id="email" name="email" value="${userData.email || ''}">
						</section>
						<section class="form-group">
							<label for="password">Password</label>
							<input type="password" id="password" name="password" placeholder="Enter new password">
						</section>
						<section class="form-actions">
							<button type="submit" class="edit-profile">Save Changes</button>
						</section>
					</form>
				</section>
			`;
		} catch (error) {
			console.error('Error rendering EditProfile:', error);
			this.shadowRoot!.innerHTML = "<p>Failed to load user data. Please try again later.</p>";
		}
	}
}

customElements.define('edit-profile', EditProfile);
export default EditProfile;
