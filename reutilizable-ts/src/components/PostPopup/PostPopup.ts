import { Post } from '../../types/post';

class PostPopup extends HTMLElement {
    private post: Post | null = null;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    setPost(post: Post) {
        this.post = post;
        this.render();
    }

    close() {
        this.post = null;
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = ''; // Limpiar el contenido
        }
        this.style.display = 'none'; // Ocultar el popup
    }

    render() {
        if (this.shadowRoot && this.post) {
            this.shadowRoot.innerHTML = `
                <div class="popup">
                    <h2>${this.post.name}</h2>
                    <p class="categorie"><strong>Categoría:</strong> ${this.post.categorie}</p>
                    <p class="ingredients"><strong>Ingredientes:</strong> ${this.post.ingredients}</p>
                    <p class="preparation"><strong>Preparación:</strong> ${this.post.preparation}</p>
                    <p class="time"><strong>Tiempo:</strong> ${this.post.time}</p>
                    <button id="close-button">Cerrar</button>
                </div>
                <style>
                    .popup {
                        position: fixed;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        background: white;
                        padding: 20px;
                        border: 1px solid #ccc;
                        z-index: 1000;
                    }
                </style>
            `;

            this.shadowRoot.getElementById('close-button')?.addEventListener('click', () => this.close());
        }
    }
}

customElements.define('post-popup', PostPopup);
export default PostPopup;