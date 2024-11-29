import { Post } from "../../types/post";
import { addObserver, appState, dispatch } from "../../store";
import { getProductsAction } from "../../store/actions";
import { addLikeUser } from "../../utils/firebase";
import PostPopup from '../PostPopup/PostPopup';


const post: Post = {
    name: "",
    ingredients: "",
    preparation: "",
    categorie: "",
    time: "",
    difficulty: "",
    image: "",
    likes: {},
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
        this.render();

        this.addHeartButtonListener(); 
    }

    async render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                    <link rel="stylesheet" href="../src/components/card-list/style.css">
            `;

            appState.posts?.forEach((post: any) => {
                post.likes = Array.isArray(post.likes) ? post.likes : [];

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

                
                photocontainer.addEventListener('click', () => this.openPopup(post));
           
                titlecontainer.addEventListener('click', () => this.openPopup(post));

                
				const heartButton = this.ownerDocument.createElement("button");
				heartButton.classList.add("heart-button");
				heartButton.id = `btn-heart-${post.name}`
				heartButton.innerHTML = `
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30">
						<path class="heart-outline" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="none" stroke="#ff9da6" stroke-width="2"/>
					</svg>
                `;

                heartButton.classList.toggle("filled");
					const path = heartButton.querySelector(".heart-outline");

					let userLiked = false

					if(post.likes.length > 0 && post.likes){
						userLiked = post.likes.includes(appState.user.userId);
						console.log('validation', userLiked);
					}

					
					if (userLiked) {
						console.log('post kidep by meeee'
						);
						
						heartButton.classList.add("filled");
						if (path) {
							path.setAttribute("fill", "#ff9da6"); 
							path.setAttribute("stroke", "#ff9da6"); 
						}
					} else {
						heartButton.classList.remove("filled");
						if (path) {
							path.setAttribute("fill", "none"); 
							path.setAttribute("stroke", "#ff9da6"); 
						}
					}

				const amountLikes = this.ownerDocument.createElement("p");
				amountLikes.innerHTML = post.likes.length || 0;
				subtitlecontainer.appendChild(amountLikes);
				amountLikes.classList.add("amountlikes");


				heartButton.addEventListener("click", () => {
					console.log('click', heartButton.id);
					console.log('like in post', post.uid);

					if (post.uid) {
						addLikeUser(post.uid);
					} else {
						console.error("El post no tiene un UID válido");
					}
				
				});

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
        
        
        if (popup instanceof PostPopup) {
            popup.setPost(post);
            popup.style.display = 'block'; 
            this.ownerDocument.body.appendChild(popup); 
        } else {
            console.error('No se pudo crear una instancia válida de PostPopup');
        }
    }

    addHeartButtonListener() {
        const heartButtons = this.shadowRoot?.querySelectorAll(".heart-button");
        heartButtons?.forEach((button) => {
            button.addEventListener("click", () => {
                console.log("Botón de corazón clicado");
            });
        });
    }
}

customElements.define("card-list", CardList);
export default CardList;


