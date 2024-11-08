import { Post } from "../../types/post";
import { addObserver, appState, dispatch } from "../../store";
import { getProductsAction } from "../../store/actions";

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
			<style>

			.post {
    display: flex;
    flex-direction: column;
    border: 0.063rem solid #ddd; 
    border-radius: 1.25rem; 
    background-color: #f9f9f9;
    box-sizing: border-box;
    margin: 0.125rem; 
    flex: 0 1 12.5rem;  
    max-width: 15.625rem; 
    overflow: hidden;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0.1, 0.2); 
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    height: 20rem; /* Altura fija para las cartas */
}

.post:hover {
    transform: translateY(-0.313rem); 
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2); 
}

.photo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 14,5rem; /* Altura fija para el contenedor de la imagen */
    overflow: hidden; /* Asegura que las imágenes no se salgan del contenedor */
}

.img {
    width: 100%;
    height: 100%; /* Asegura que la imagen ocupe toda la altura del contenedor */
    object-fit: cover; /* Asegura que la imagen mantenga su proporción */
    border-radius: 0.5rem 0.5rem 0 0; 
}

.info {
    background-color: white;
    padding: 1rem; 
    text-align: left;
    flex-grow: 1; /* Permite que el contenedor de info crezca */
}

.subtitle {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.info h1 {
    font-size: 1rem;
    margin: 0;
    color: #333;
}

.info p {
    font-size: 0.9rem;
    color: #666;
    margin-top: 0.5rem;
}

.heart-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    transition: transform 0.3s ease;
}

.heart-button svg {
    width: 1.5rem; 
    height: 1.5rem; 
    fill: none; 
    stroke: #ff9da6; 
    stroke-width: 0.125rem; 
    transition: fill 0.3s ease, stroke 0.3s ease;
}

.heart-button:hover {
    transform: scale(1.1);
}

@media screen and (max-width: 26.875rem) {
    .post {
        width: 11.25rem; 
    }
}



			</style>
			`;
			
			
			appState.posts?.forEach((post: any) => {
				
				const maincontainer = this.ownerDocument.createElement("section");
				maincontainer.classList.add("post");
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
        }
    }
}

customElements.define("card-list", CardList);
export default CardList;