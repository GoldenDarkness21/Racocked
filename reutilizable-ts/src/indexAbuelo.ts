import recipes from './data/data';
import stories from './data/dataProfile'; 
import Post, { Attribute } from './components/card/card';
import Storie, { StorieAttribute} from './components/profileStorie/storie';
import SearchBar, { SearchAttribute } from './components/search-bar/searchBar';


class AppContainer extends HTMLElement {
    recipesList: Post[] = [];
    storiesList: HTMLElement[] = []; 

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Crear el listado de recetas
        recipes.forEach(recipe => {
            const postElement = this.ownerDocument.createElement("component-post") as Post;
            postElement.setAttribute(Attribute.photo, recipe.photo);
            postElement.setAttribute(Attribute.userName, recipe.userName);
            postElement.setAttribute(Attribute.recipeName, recipe.recipeName);
            this.recipesList.push(postElement);
        });

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

                <div id="arriba">
                  <div id="izquierda">
                    <div id="story-container"></div> 
                  </div>
                  <div id="derecha">
                    <search-bar  ${SearchAttribute.placeholder}="Search recipe..."></search-bar>
                  </div>
                </div>
                
                <div id="post">
                <div id="component-post"></div>
                </div>
                
                
            `;

            const storyContainer = this.shadowRoot.querySelector("#story-container");
            const postContainer = this.shadowRoot.querySelector("#component-post");

            //aqui meto las stories que aun no se quieren pintar
            this.storiesList.forEach(story => {
                if (storyContainer) {
                    storyContainer.appendChild(story);
                }
            });

            //Aqui las recetas meto al contenedor
            this.recipesList.forEach(recipe => {
                if (postContainer) {
                    postContainer.appendChild(recipe);
                }
            });
        }
    }
}

customElements.define('app-container', AppContainer);
export default AppContainer;
