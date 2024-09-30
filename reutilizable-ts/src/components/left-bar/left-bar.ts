export enum SidebarAttribute {
    'profilePicture' = 'profilePicture', 
}

class UserSidebar extends HTMLElement {
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
                        <button class="menu-item active">
                            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"></path>
                                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                            </svg>
                        </button>
                        <button class="menu-item">
                            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart">
                                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1a5.5 5.5 0 0 0-7.8 7.8l8.8 8.8 8.8-8.8a5.5 5.5 0 0 0 0-7.8z"></path>
                            </svg>
                        </button>
                        <button class="menu-item">
                            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </button>
                        <button class="menu-item">
                            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-settings">
                                <circle cx="12" cy="12" r="3"></circle>
                                <path d="M19.4 15a1.77 1.77 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.77 1.77 0 0 0-1.82-.33 1.77 1.77 0 0 0-1 1.6v.09a2 2 0 0 1-4 0v-.09a1.77 1.77 0 0 0-1-1.6 1.77 1.77 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.77 1.77 0 0 0 5 15a1.77 1.77 0 0 0-1.6-1H3.31a2 2 0 0 1 0-4h.09a1.77 1.77 0 0 0 1.6-1 1.77 1.77 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.77 1.77 0 0 0 9 5a1.77 1.77 0 0 0 1-1.6V3.31a2 2 0 0 1 4 0v.09a1.77 1.77 0 0 0 1 1.6 1.77 1.77 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.77 1.77 0 0 0-.33 1.82v.09a1.77 1.77 0 0 0 1.6 1z"></path>
                            </svg>
                        </button>
                        <div class="exit">
                        <button class="menu-item">
                            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-out">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                <polyline points="16 17 21 12 16 7"></polyline>
                                <line x1="21" y1="12" x2="9" y2="12"></line>
                            </svg>
                        </button>
                        </div>
                    </div>
                </div>
            `;
        }
    }
}


customElements.define('user-sidebar', UserSidebar);
export default UserSidebar;
