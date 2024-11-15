import recipes from '../../data/data';
import stories from '../../data/dataProfile'; 
import Post, { Attribute } from '../../components/card/card';
import Storie, { StorieAttribute } from '../../components/profileStorie/storie';
import SearchBar, { SearchAttribute } from '../../components/search-bar/searchBar';
import UserSidebar, { SidebarAttribute } from '../../components/left-bar/left-bar';
import BottomNavbar, { NavbarAttribute } from '../../components/bottomBar/BottomNavbar'; // Importar el BottomNavbar
import { appState, dispatch } from '../../store';
import { getFirebaseInstance } from '../../utils/firebase';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';



class Profile extends HTMLElement {
    recipesList: Post[] = [];
    storiesList: HTMLElement[] = []; 

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });


        stories.forEach(story => {
            const storyElement = this.ownerDocument.createElement("profile-storie") as Storie; 
            storyElement.setAttribute(StorieAttribute.photo, story.photo);
            this.storiesList.push(storyElement);
        });
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
                    <div id="content">
                        <div id="arriba">
                            <div id="story-container"></div>
                            <div id="derecha">
                                <search-bar ${SearchAttribute.placeholder}="Search recipe..."></search-bar>
                            </div>
                        </div>
                    </div>
                    
                    <bottom-navbar ${NavbarAttribute.activeIcon}="home"></bottom-navbar>
                </div>
            `;

            };
    
        }
    }

customElements.define('profile', Profile);
export default Profile;
