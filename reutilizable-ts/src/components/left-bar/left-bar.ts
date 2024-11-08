import { logOut } from "../../utils/firebase";
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';
import { dispatch } from "../../store";
import PostPopup from '../PostPopup/PostPopup'; // Ajusta la ruta según tu estructura de carpetas

export enum SidebarAttribute {
    'profilePicture' = 'profilePicture', 
}

class UserSidebar extends HTMLElement {
    private postPopup: PostPopup | null = null; // Agrega esta línea

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });  
    }

    static get observedAttributes() {
        return Object.values(SidebarAttribute);
    }

    attributeChangedCallback(propName: SidebarAttribute, oldValue: string | undefined, newValue: string | undefined) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
        this.postPopup = document.querySelector('post-popup'); // Obtén el popup
    }

    changeScreen(screen: Screens) {
        dispatch(navigate(screen));
        this.closePopupIfNotDashboard(screen); // Cierra el popup si no es dashboard
    }

    closePopupIfNotDashboard(screen: Screens) {
        if (this.postPopup && screen !== Screens.DASHBOARD) {
            this.postPopup.close(); // Cierra el popup
        }
    }

    addEventListeners() {
        const logoutButton = this.shadowRoot?.querySelector('#logout');
        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                console.log('logout clickeado');
                logOut().then(() => {
                    console.log('Logout exitoso');
                }).catch((error) => {
                    console.error('Error al hacer logout:', error);
                });
            });
        }

        // Agregar listener para el botón de favoritos
        const favoritosButton = this.shadowRoot?.querySelector('#favoritos');
        if (favoritosButton) {
            favoritosButton.addEventListener('click', () => {
                this.changeScreen(Screens.FAVORITES);
            });
        }

        // Agregar listener para el botón de perfil
        const profileButton = this.shadowRoot?.querySelector('#profile');
        if (profileButton) {
            profileButton.addEventListener('click', () => {
                this.changeScreen(Screens.PROFILE);
            });
        }

        // Agregar listener para el botón de crear post
        const createPostButton = this.shadowRoot?.querySelector('#create-post');
        if (createPostButton) {
            createPostButton.addEventListener('click', () => {
                this.changeScreen(Screens.CREATEPOST);
            });
        }

        // Agregar listener para el botón de dashboard
        const homeButton = this.shadowRoot?.querySelector('#home');
        if (homeButton) {
            homeButton.addEventListener('click', () => {
                this.changeScreen(Screens.DASHBOARD);
            });
        }
    }

    render() {
        if (this.shadowRoot) {
            const profilePicture = this.getAttribute(SidebarAttribute.profilePicture) || 'Not Found'; 
    
            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="../src/components/left-bar/left-bar.css">
                <div class="sidebar">
                    <div class="profile-section">
                        <div class="profile-picture"></div>
                    </div>
                    <div class="menu">
                        <button id="home" class="menu-item active">
                            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"></path>
                                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                            </svg>
                        </button>
                        
                        <button id="favoritos" class="menu-item">
                            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart">
                                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1a5.5 5.5 0 0 0-7.8 7.8l8.8 8.8 8.8-8.8a5.5 5.5 0 0 0 0-7.8z"></path>
                            </svg>
                        </button>

                        <button id="create-post" class="menu-item">
                             <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle">
                                 <circle cx="12" cy="12" r="10"></circle>
                                 <line x1="12" y1="8" x2="12" y2="16"></line>
                                 <line x1="8" y1="12" x2="16" y2="12"></line>
                            </svg>
                        </button>

                        <button id="profile" class="menu-item">
                            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </button>

                        <button id="logout" class="menu-item">
                            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-out">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                <polyline points="16 17 21 12 16 7"></polyline>
                                <line x1="21" y1="12" x2="9" y2="12"></line>
                            </svg>
                        </button>
                    </div>
                </div>
            `;
        }
    }
}

customElements.define('user-sidebar', UserSidebar);
export default UserSidebar;
