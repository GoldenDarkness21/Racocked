import { Post } from '../../types/post';
import { addPost } from '../../utils/firebase';
import { addObserver, appState, dispatch } from '../../store';
import { getProductsAction } from '../../store/actions';
import styles from './styles.css';

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
		// if (appState.posts.length === 0 || appState == undefined) {
		// 	const action = await getProductsAction();
		// 	dispatch(action);
		// } else {
		// 	this.render();
		// }
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

            const section1 = this.ownerDocument.createElement('section');
			section1.classList.add('principal-section');
			const section2 = this.ownerDocument.createElement('section');
			section2.classList.add('image-section');
			const section3 = this.ownerDocument.createElement('section'); 
			section3.classList.add('form-section');


            // Agregar la segunda y tercera sección dentro de section 1 y la 1 al shadowroot
			section1.appendChild(section2);
			section1.appendChild(section3);
			this.shadowRoot.appendChild(section1);


            // Título del formulario
		    const title = this.ownerDocument.createElement('h1');
		    title.innerText = 'New Post!';
		    section2.appendChild(title);
		    title.classList.add('title');

            //campo del nombre
            const nameLabel = this.ownerDocument.createElement('label');
		    nameLabel.innerText = 'Recipe name';
            nameLabel.htmlFor = 'recipe name'
            section3.appendChild(nameLabel)
		    nameLabel.classList.add('label');

			const pName = this.ownerDocument.createElement('input');
			pName.addEventListener('change', this.changeName);
			this.shadowRoot.appendChild(pName);
			pName.classList.add('Name');


            //campo de los ingredientes
            const ingredientsLabel = this.ownerDocument.createElement('label');
		    ingredientsLabel.innerText = 'Ingredients';
            ingredientsLabel.htmlFor = 'ingredients'
            section3.appendChild(ingredientsLabel)
		    ingredientsLabel.classList.add('label');

			const pIngredients = this.ownerDocument.createElement('input');
			pIngredients.addEventListener('change', this.changeIngredients);
			this.shadowRoot.appendChild(pIngredients);
            pIngredients.classList.add('Ingredients');



            //campo de preparation
            const preparationLabel = this.ownerDocument.createElement('label');
		    preparationLabel.innerText = 'Preparation';
            preparationLabel.htmlFor = 'preparation'
            section3.appendChild(preparationLabel)
		    preparationLabel.classList.add('label');

			const pPreparation = this.ownerDocument.createElement('input');
			pPreparation.addEventListener('change', this.changePreparation);
			section3.appendChild(pPreparation);
            pPreparation.classList.add('Preparation');



            //campo del tiempo
            const timeLabel = this.ownerDocument.createElement('label');
		    timeLabel.innerText = 'Time';
            timeLabel.htmlFor = 'time'
            section3.appendChild(timeLabel)
		    timeLabel.classList.add('label');

			const pTime = this.ownerDocument.createElement('input');
			pTime.addEventListener('change', this.changeCategorie);
			section3.appendChild(pTime);
            pTime.classList.add('Time');



            //campo de la categoria
            const categoryLabel = this.ownerDocument.createElement('label');
		    categoryLabel.innerText = 'Category';
            categoryLabel.htmlFor = 'category'
            section3.appendChild(categoryLabel)
		    categoryLabel.classList.add('label');

			const pCategory = this.ownerDocument.createElement('input');
            pCategory.id = 'category'
			pCategory.addEventListener('change', this.changeCategorie);
			section3.appendChild(pCategory);
            pCategory.classList.add('Categorie');


            //boton para publicar un post
			const publish = this.ownerDocument.createElement('button');
			publish.innerText = 'Publish';
			publish.addEventListener('click', this.submitForm);
			section3.appendChild(publish);



			// appState.posts?.forEach((post: any) => {
			// 	const container = this.ownerDocument.createElement('section');

			// 	const name = this.ownerDocument.createElement('h3');
			// 	name.innerText = post.hola;
			// 	container.appendChild(name);


			// 	this.shadowRoot?.appendChild(container);
			// });
		}
	}
}

customElements.define('app-createpost', Createpost);
export default Createpost;