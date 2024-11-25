// settings.js
import UserSidebar from '../../components/left-bar/left-bar';
import BottomNavbar, { NavbarAttribute } from '../../components/bottomBar/BottomNavbar';
import EditProfile from '../../components/profile-edit/profile-edit';

class Settings extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
		console.log('Settings screen rendered');
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
						<div id="edit-profile">
							<edit-profile></edit-profile>
						</div>
					</div>
					<bottom-navbar ${NavbarAttribute.activeIcon}="home"></bottom-navbar>
				</div>
			`;
		}
	}
}

customElements.define('app-settings', Settings);
export default Settings;
