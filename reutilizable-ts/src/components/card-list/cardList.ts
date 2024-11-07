import { Post } from '../../types/post';
import { addPost } from '../../utils/firebase';
import { addObserver, appState, dispatch } from '../../store';
import { getProductsAction } from '../../store/actions';

const post: Post = {
    name: "",
    ingredients: "",
    preparation: "",
    categorie: "",
    time: "",
    difficulty: "",
    userUid: appState.user,
    userName: appState.user
};

class CardList extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
	}

	async connectedCallback() {
        console.log('appstate de carlist' , appState)
		if (appState.posts.length === 0) {
			const action = await getProductsAction();
            console.log(action)
			dispatch(action);
		} else {
			this.render();
		}
	}


	async render() {
		if (this.shadowRoot) {
			
			appState.posts?.forEach((post: any) => {
				const container = this.ownerDocument.createElement('section');

				const name = this.ownerDocument.createElement('h3');
				name.innerText = post.name;
				container.appendChild(name);

                const ingredients = this.ownerDocument.createElement('p');
				ingredients.innerText = post.ingredients;
				container.appendChild(ingredients);

                



				this.shadowRoot?.appendChild(container);
			});
		}
	}
}

customElements.define('card-list', CardList);
export default CardList;