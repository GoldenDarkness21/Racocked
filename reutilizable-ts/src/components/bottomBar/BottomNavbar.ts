export enum NavbarAttribute {
    'activeIcon' = 'activeIcon',
}

class BottomNavbar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return Object.values(NavbarAttribute);
    }

    attributeChangedCallback(propName: NavbarAttribute, oldValue: string | undefined, newValue: string | undefined) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            const activeIcon = this.getAttribute(NavbarAttribute.activeIcon) || 'home';

            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="../src/components/bottomBar/BottomNavbar.css">
                <div class="navbar">
                    <button class="menu-item ${activeIcon === 'home' ? 'active' : ''}">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                    </button>
                    <button class="menu-item ${activeIcon === 'heart' ? 'active' : ''}">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1a5.5 5.5 0 0 0-7.8 7.8l8.8 8.8 8.8-8.8a5.5 5.5 0 0 0 0-7.8z"></path>
                        </svg>
                    </button>
                    <button class="menu-item ${activeIcon === 'search' ? 'active' : ''}">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </button>
                    <button class="menu-item ${activeIcon === 'user' ? 'active' : ''}">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </button>
                </div>
            `;
        }
    }
}

customElements.define('bottom-navbar', BottomNavbar);
export default BottomNavbar;
