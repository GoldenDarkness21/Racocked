import './screens/1register/1register';
import './screens/3dashboard';
import './screens/2login/2login';
import './screens/createPost';
import { addObserver, appState } from './store';
import { Screens } from './types/navegation';

class AppContainer extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        addObserver(this);
    }

    connectedCallback(){
        this.render();
    }

    render(){
        if(this.shadowRoot) this.shadowRoot.innerHTML = "";
        switch  (appState.screen)  {

            case Screens.REGISTER:
                const register = this.ownerDocument.createElement("app-register");
                this.shadowRoot?.appendChild(register);
            break;

            case Screens.LOGIN:
                const login = this.ownerDocument.createElement("app-login");
                this.shadowRoot?.appendChild(login);
            break;

            case Screens.DASHBOARD:
                const dashboard = this.ownerDocument.createElement("app-dashboard");
                this.shadowRoot?.appendChild(dashboard);
            break;

            case Screens.POST:
                const post = this.ownerDocument.createElement("app-post");
                this.shadowRoot?.appendChild(post);
            break;

            case Screens.PROFILE:
                const profile = this.ownerDocument.createElement("app-profile");
                this.shadowRoot?.appendChild(profile);
            break;

            case Screens.SETTINGS:
                const settings = this.ownerDocument.createElement("app-settings");
                this.shadowRoot?.appendChild(settings);
            break;

            case Screens.CREATEPOST:
                const createpost = this.ownerDocument.createElement("app-createpost");
                this.shadowRoot?.appendChild(createpost);
            break;
        
            default:

            console.log('Pantalla actual', appState.screen)

                break;
            
        }
    }
}

customElements.define('app-container',AppContainer);