import recipes from '../../data/data';
import UserSidebar, { SidebarAttribute } from '../../components/left-bar/left-bar';
import BottomNavbar, { NavbarAttribute } from '../../components/bottomBar/BottomNavbar'; // Importar el BottomNavbar
import { appState, dispatch } from '../../store';
import { getFirebaseInstance } from '../../utils/firebase';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';



class Profile extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

    }

    async connectedCallback() {
        this.render()
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = ` 
                <link rel="stylesheet" href="../src/screens/6profile/profile.css">
                <div id="main-container">
                    <div id="sidebar">
                        <user-sidebar ${SidebarAttribute.profilePicture}></user-sidebar>
                    </div>
                    <div id="content"></div>
                    </div>
                    
                    <bottom-navbar ${NavbarAttribute.activeIcon}="home"></bottom-navbar>
                </div>
            `;

            };
    
        }
    }

customElements.define('app-profile', Profile);
export default Profile;
