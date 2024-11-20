import UserSidebar from '../../components/left-bar/left-bar';
import BottomNavbar, { NavbarAttribute } from '../../components/bottomBar/BottomNavbar';
import { dispatch } from '../../store';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';

class Profile extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        this.render();
        this.addEventListeners();
    }

    addEventListeners() {
        const editButton = this.shadowRoot?.querySelector('#edit');
        if (editButton) {
            editButton.addEventListener('click', () => {
                console.log('Edit button clicked');
                this.handleEditClick();
            });
        }
    }

    handleEditClick() {
        dispatch(navigate(Screens.SETTINGS));
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = ` 
                <link rel="stylesheet" href="../src/screens/6profile/profile.css">
                <div id="main-container">
                    <div id="sidebar">
                        <user-sidebar></user-sidebar>
                    </div>
                    <div id="content">
                        <h2>Recipes</h2>
                        <button id="edit">Edit</button>
                    </div>
                    <bottom-navbar ${NavbarAttribute.activeIcon}="home"></bottom-navbar>
                </div>
            `;
        }
    }
}

customElements.define('app-profile', Profile);
export default Profile;

