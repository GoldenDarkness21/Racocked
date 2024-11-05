import { Post } from '../../types/post';
import { addPost } from '../../utils/firebase';
import { addObserver, appState, dispatch } from '../../store';
import { getProductsAction } from '../../store/actions';
import styles from './styles.css';
import './path/to/LeftBar'; // Asegúrate de ajustar la ruta según la ubicación real de tu componente

const post: Post = {
    name: '',
    ingredients: '',
    preparation: '',
    categorie:  '',
    time: '',
    difficulty: '',
};

class Createpost extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const style = document.createElement('style');
        style.textContent = styles;
        this.shadowRoot?.appendChild(style);
        addObserver(this);
    }

    async connectedCallback() {
        this.render();
    }

    changeName(e: any) {
        post.name = e.target.value;
    }

    changeIngredients(e: any) {
        post.ingredients = e.target.value;
    }

    changePreparation(e: any) {
        post.preparation = e.target.value;
    }

    changeCategorie(e: any) {
        post.categorie = e.target.value;
    }

    changeTime(e: any) {
        post.time = e.target.value;
    }

    changeDifficulty(e: any) {
        post.difficulty = e.target.value;
    }

    submitForm() {
        addPost(post);
    }

    render() {
        if (this.shadowRoot) {
            // Instancia de LeftBar
            const leftBar = this.ownerDocument.createElement('left-bar');
            leftBar.classList.add('left-bar'); // Añade clase si quieres estilizar LeftBar

            // Crear secciones
            const section1 = this.ownerDocument.createElement('section');
            section1.classList.add('principal-section');
            section1.appendChild(leftBar); // Añadir LeftBar aquí

            const section2 = this.ownerDocument.createElement('section');
            section2.classList.add('image-section');

            const section3 = this.ownerDocument.createElement('section');
            section3.classList.add('form-section');

            const section4 = this.ownerDocument.createElement('section');
            section4.classList.add('category-section');

            // Título del formulario
            const title = this.ownerDocument.createElement('h1');
            title.innerText = 'New Post!';
            section3.appendChild(title);
            title.classList.add('title');

            // Campo del nombre
            const nameLabel = this.ownerDocument.createElement('label');
            nameLabel.innerText = 'Recipe name';
            nameLabel.htmlFor = 'recipe name';
            section3.appendChild(nameLabel);
            nameLabel.classList.add('label');

            const pName = this.ownerDocument.createElement('input');
            pName.addEventListener('change', this.changeName.bind(this));
            section3.appendChild(pName);
            pName.classList.add('name');

            // Campo de los ingredientes
            const ingredientsLabel = this.ownerDocument.createElement('label');
            ingredientsLabel.innerText = 'Ingredients';
            ingredientsLabel.htmlFor = 'ingredients';
            section3.appendChild(ingredientsLabel);
            ingredientsLabel.classList.add('label');

            const pIngredients = this.ownerDocument.createElement('input');
            pIngredients.addEventListener('change', this.changeIngredients.bind(this));
            section3.appendChild(pIngredients);
            pIngredients.classList.add('ingredients');

            // Campo de preparación
            const preparationLabel = this.ownerDocument.createElement('label');
            preparationLabel.innerText = 'Preparation';
            preparationLabel.htmlFor = 'preparation';
            section3.appendChild(preparationLabel);
            preparationLabel.classList.add('label');

            const pPreparation = this.ownerDocument.createElement('input');
            pPreparation.addEventListener('change', this.changePreparation.bind(this));
            section3.appendChild(pPreparation);
            pPreparation.classList.add('preparation');

            // Campo de la categoría
            const categoryContainer = this.ownerDocument.createElement('div');
            const categoryLabel = this.ownerDocument.createElement('label');
            categoryLabel.innerText = 'Category';
            categoryLabel.htmlFor = 'category';
            categoryContainer.appendChild(categoryLabel);
            categoryLabel.classList.add('label');

            const pCategory = this.ownerDocument.createElement('input');
            pCategory.id = 'category';
            pCategory.addEventListener('change', this.changeCategorie.bind(this));
            categoryContainer.appendChild(pCategory);
            pCategory.classList.add('category');

            section4.appendChild(categoryContainer);

            // Campo del tiempo
            const timeContainer = this.ownerDocument.createElement('div');
            const timeLabel = this.ownerDocument.createElement('label');
            timeLabel.innerText = 'Time';
            timeLabel.htmlFor = 'time';
            timeContainer.appendChild(timeLabel);
            timeLabel.classList.add('label');

            const pTime = this.ownerDocument.createElement('input');
            pTime.id = 'time';
            pTime.addEventListener('change', this.changeTime.bind(this));
            timeContainer.appendChild(pTime);
            pTime.classList.add('time');

            section4.appendChild(timeContainer);

            // Campo de dificultad
            const difficultyContainer = this.ownerDocument.createElement('div');
            const difficultyLabel = this.ownerDocument.createElement('label');
            difficultyLabel.innerText = 'Difficulty';
            difficultyLabel.htmlFor = 'difficulty';
            difficultyContainer.appendChild(difficultyLabel);
            difficultyLabel.classList.add('label');

            const pDifficulty = this.ownerDocument.createElement('input');
            pDifficulty.id = 'difficulty';
            pDifficulty.addEventListener('change', this.changeDifficulty.bind(this));
            difficultyContainer.appendChild(pDifficulty);
            pDifficulty.classList.add('difficulty');

            section4.appendChild(difficultyContainer);

            // Botón de submit
            const submitButton = this.ownerDocument.createElement('button');
            submitButton.innerText = 'Submit';
            submitButton.addEventListener('click', this.submitForm.bind(this));
            section3.appendChild(submitButton);
            submitButton.classList.add('submit-button');

            // Agregar todas las secciones al Shadow DOM
            this.shadowRoot.append(section1, section2, section3, section4);
        }
    }
}

customElements.define('create-post', Createpost);
export default Createpost;
