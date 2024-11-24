class Settings extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
		this.attachEditProfile();
		console.log('Settings component loaded.');
	}

	attachEditProfile() {
		const editProfileContainer = this.shadowRoot?.querySelector('#edit-profile');
		if (editProfileContainer) {
			const editProfileComponent = document.createElement('edit-profile');
			editProfileContainer.appendChild(editProfileComponent);
			console.log('EditProfile component attached.');
		} else {
			console.error('Error: #edit-profile container not found.');
		}
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
				<link rel="stylesheet" href="../src/screens/7settings/settings.css">
				<div id="main-container">
					<div id="sidebar">
						<user-sidebar></user-sidebar>
					</div>
					<div id="content">
						<h1>Settings</h1>
						<div id="edit-profile"></div>
					</div>
					<bottom-navbar active-icon="home"></bottom-navbar>
				</div>
			`;
		}
	}
}

customElements.define('app-settings', Settings);
export default Settings;
