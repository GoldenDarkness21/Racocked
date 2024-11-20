import UserSidebar from '../../components/left-bar/left-bar';
import BottomNavbar, { NavbarAttribute } from '../../components/bottomBar/BottomNavbar';

class Settings extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render(); // Llama a render para generar el contenido al montar el componente
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
                    </div>
                    <bottom-navbar ${NavbarAttribute.activeIcon}="home"></bottom-navbar>
                </div>
            `;
        }
    }
}

customElements.define('app-settings', Settings);
export default Settings;
