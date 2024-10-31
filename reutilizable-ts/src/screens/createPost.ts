import { Post } from '../types/post';
import { addPost } from '../utils/firebase';
import { addObserver, appState, dispatch } from '../store';
import { getProductsAction } from '../store/actions';

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
		addObserver(this);
	}

	async connectedCallback() {
		if (appState.posts.length === 0) {
			const action = await getProductsAction();
			dispatch(action);
		} else {
			this.render();
		}
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

	async render() {
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

            //campo del nombre
            const nameLabel = this.ownerDocument.createElement('label');
		    nameLabel.innerText = 'Recipe name';
		    nameLabel.classList.add('label');

			const pName = this.ownerDocument.createElement('input');
			pName.addEventListener('change', this.changeName);
			this.shadowRoot.appendChild(pName);
			pName.classList.add('Name');


            //campo de los ingredientes
            const ingredientsLabel = this.ownerDocument.createElement('label');
		    ingredientsLabel.innerText = 'Ingredients';
		    ingredientsLabel.classList.add('label');

			const pIngredients = this.ownerDocument.createElement('input');
			pIngredients.addEventListener('change', this.changeIngredients);
			this.shadowRoot.appendChild(pIngredients);
            pIngredients.classList.add('Ingredients');



            //campo de preparation
            const preparationLabel = this.ownerDocument.createElement('label');
		    preparationLabel.innerText = 'Preparation';
		    preparationLabel.classList.add('label');

			const pPreparation = this.ownerDocument.createElement('input');
			pPreparation.addEventListener('change', this.changePreparation);
			this.shadowRoot.appendChild(pPreparation);
            pPreparation.classList.add('Preparation');



            //campo del tiempo
            const timeLabel = this.ownerDocument.createElement('label');
		    timeLabel.innerText = 'Categorie';
		    timeLabel.classList.add('label');

			const pTime = this.ownerDocument.createElement('input');
			pTime.addEventListener('change', this.changeCategorie);
			this.shadowRoot.appendChild(pTime);
            pTime.classList.add('Time');



            //campo de la categoria
            const categorieLabel = this.ownerDocument.createElement('label');
		    categorieLabel.innerText = 'Categorie';
		    categorieLabel.classList.add('label');

			const pCategorie = this.ownerDocument.createElement('input');
			pCategorie.addEventListener('change', this.changeCategorie);
			this.shadowRoot.appendChild(pCategorie);
            pCategorie.classList.add('Categorie');



			const save = this.ownerDocument.createElement('button');
			save.innerText = 'Publish';
			save.addEventListener('click', this.submitForm);
			this.shadowRoot.appendChild(save);

			appState.posts?.forEach((post: any) => {
				const container = this.ownerDocument.createElement('section');

				const name = this.ownerDocument.createElement('h3');
				name.innerText = post.name;
				container.appendChild(name);


				this.shadowRoot?.appendChild(container);
			});
		}
	}
}

customElements.define('app-createpost', Createpost);
export default Createpost;