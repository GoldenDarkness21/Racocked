import { Post } from "../../types/post";
import { addObserver, appState, dispatch } from "../../store";
import { getProductsAction } from "../../store/actions";
import PostPopup from '../PostPopup/PostPopup';

const post: Post = {
    name: "",
    ingredients: "",
    preparation: "",
    categorie: "",
    time: "",
    difficulty: "",
    image: "",
};

class CardList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        addObserver(this);
    }

    async connectedCallback() {
        console.log("appstate de carlist", appState);
        if (appState.posts.length === 0) {
            const action = await getProductsAction();
            console.log(action);
            dispatch(action);
        } else {
            this.render();
        }
        this.addHeartButtonListener();
    }

    async render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="../src/components/card-list/style.css">
            `;

            appState.posts?.forEach((post: any) => {
                const maincontainer = this.ownerDocument.createElement("section");
                maincontainer.classList.add("post");

                // Agregar evento de clic para abrir el popup
                maincontainer.addEventListener('click', () => this.openPopup(post));

                const photocontainer = this.ownerDocument.createElement("section");
                photocontainer.classList.add("photo");
                const infocontainer = this.ownerDocument.createElement("section");
                infocontainer.classList.add("info");
                const titlecontainer = this.ownerDocument.createElement("section");
                titlecontainer.classList.add("title");
                const subtitlecontainer = this.ownerDocument.createElement("section");
                subtitlecontainer.classList.add("subtitle");

                const image = this.ownerDocument.createElement("img");
                image.src = post.image;
                photocontainer.appendChild(image);
                image.classList.add("img");

                const name = this.ownerDocument.createElement("h1");
                name.innerText = post.name;
                titlecontainer.appendChild(name);

                const autor = this.ownerDocument.createElement("p");
                autor.innerHTML = post.userName;
                subtitlecontainer.appendChild(autor);

                // Botón de corazón
                const heartButton = this.ownerDocument.createElement("button");
                heartButton.classList.add("heart-button");
                heartButton.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30">
                        <path class="heart-outline" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="none" stroke="#ff9da6" stroke-width="2"/>
                    </svg>
                `;

                // Agregar el botón al contenedor principal o a la info
                subtitlecontainer.appendChild(heartButton);
                infocontainer.appendChild(titlecontainer);
                infocontainer.appendChild(subtitlecontainer);
                maincontainer.appendChild(photocontainer);
                maincontainer.appendChild(infocontainer);
                this.shadowRoot?.appendChild(maincontainer);
            });
        }
    }

    openPopup(post: Post) {
        console.log("Post en popup:", post);
        const popup = this.ownerDocument.createElement('post-popup') as PostPopup;
        
        // Verifica que 'popup' es una instancia de PostPopup antes de llamar a setPost
        if (popup instanceof PostPopup) {
            popup.setPost(post);
            popup.style.display = 'block'; // Asegura que el popup sea visible
            this.ownerDocument.body.appendChild(popup); // Agregar el popup al body
        } else {
            console.error('No se pudo crear una instancia válida de PostPopup');
        }
    }
    addHeartButtonListener() {
        const heartButton = this.shadowRoot?.querySelector(".heart-button");
        if (heartButton) {
            heartButton.addEventListener("click", () => {
                heartButton.classList.toggle("filled");
                const path = heartButton.querySelector(".heart-outline");
                if (path) {
                    if (heartButton.classList.contains("filled")) {
                        path.setAttribute("fill", "#ff9da6"); // Relleno rosado
                        path.setAttribute("stroke", "#ff9da6"); // Borde rosado
                    } else {
                        path.setAttribute("fill", "none"); // Sin relleno
                        path.setAttribute("stroke", "#ff9da6"); // Borde rosado
                    }
                }
            });
        };
    }
}

customElements.define("card-list", CardList);
export default CardList;