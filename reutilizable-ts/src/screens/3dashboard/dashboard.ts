import recipes from '../../data/data';
import stories from '../../data/dataProfile'; 
import Post, { Attribute } from '../../components/card/card';
import Storie, { StorieAttribute } from '../../components/profileStorie/storie';
import SearchBar, { SearchAttribute } from '../../components/search-bar/searchBar';
import UserSidebar, { SidebarAttribute } from '../../components/left-bar/left-bar';
import BottomNavbar, { NavbarAttribute } from '../../components/bottomBar/BottomNavbar'; // Importar el BottomNavbar
import CardList from '../../components/card-list/cardList';


class Dashboard extends HTMLElement {
    recipesList: Post[] = [];
    storiesList: HTMLElement[] = []; 

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // // Crear el listado de recetas
        // recipes.forEach(recipe => {
        //     const postElement = this.ownerDocument.createElement("component-post") as Post;
        //     postElement.setAttribute(Attribute.photo, recipe.photo);
        //     postElement.setAttribute(Attribute.userName, recipe.userName);
        //     postElement.setAttribute(Attribute.recipeName, recipe.recipeName);
        //     this.recipesList.push(postElement);
        // });

        // Crear el listado de historias
        stories.forEach(story => {
            const storyElement = this.ownerDocument.createElement("profile-storie") as Storie; 
            storyElement.setAttribute(StorieAttribute.photo, story.photo);
            this.storiesList.push(storyElement);
        });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = ` 
                <link rel="stylesheet" href="../src/styles.css">
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
                        <div id="post">
                            <div id="component-post"></div>
                            <card-list ${CardList.name}></card-list>
                        </div>
                    </div>
                    
                    <bottom-navbar ${NavbarAttribute.activeIcon}="home"></bottom-navbar>
                </div>
            `;
    
            const storyContainer = this.shadowRoot.querySelector("#story-container");
            const postContainer = this.shadowRoot.querySelector("#component-post");
    
            // Insertar las historias
            this.storiesList.forEach(story => {
                if (storyContainer) {
                    storyContainer.appendChild(story);
                }
            });
    
            // Insertar las recetas
            this.recipesList.forEach(recipe => {
                if (postContainer) {
                    postContainer.appendChild(recipe);
                }
            });
        }
    }
}    

customElements.define('app-dashboard', Dashboard);
export default Dashboard;
