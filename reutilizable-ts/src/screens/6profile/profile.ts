// src/screens/Profile.js
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

    static get observedAttributes() {
        return ['profilePicture']; // Observa el atributo para la foto de perfil dinámica
    }

    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
        if (name === 'profilePicture' && oldValue !== newValue) {
            this.render(); // Vuelve a renderizar si cambia el atributo de la foto de perfil
        }
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

        const newPostButton = this.shadowRoot?.querySelector('#new-post');
        if (newPostButton) {
            newPostButton.addEventListener('click', () => {
                console.log('New Post button clicked');
                this.handleNewPostClick();
            });
        }
    }

    handleEditClick() {
        dispatch(navigate(Screens.SETTINGS));
    }

    handleNewPostClick() {
        dispatch(navigate(Screens.CREATEPOST));
    }

    render() {
        if (this.shadowRoot) {
            // Obtén el atributo de la foto de perfil o usa una predeterminada
            const profilePicture = this.getAttribute('profilePicture') || '../assets/images/avatar-placeholder.png';

            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="../src/screens/6profile/profile.css">
                <div id="main-container">
                    <div id="sidebar">
                        <user-sidebar profilePicture="${profilePicture}"></user-sidebar>
                    </div>
                    <div id="content">
                        <div id="header">
                            <div id="profile-info">
                                <div id="stats">
                                    <div id="lowered">
                                        <p>Followers</p>
                                        <h3>42.5k</h3>
                                    </div> 
                                     <div id="profile-picture"><img id="avatar" src="${profilePicture} "> <span id="camera-icon"></span>
                                     <h1 id="username">Emma_Harrison</h1>
                                 </div>
                                    <div id="lowered">
                                        <p>Following</p>
                                         <h3>598</h3>
                                    </div>

                             </div>
                         <div id="actions">
                            <button id="edit">Edit</button>
                            <button id="new-post">New Post</button>
                        </div>
                            </div>
                          <user-post></user-post>
                        </div>
                    </div>
                    <bottom-navbar ${NavbarAttribute.activeIcon}="home"></bottom-navbar>
                </div>
            `;
        }
    }
}

customElements.define('app-profile', Profile);
export default Profile;
