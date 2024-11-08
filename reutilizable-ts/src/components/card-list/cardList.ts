import { Post } from '../../types/post';
import { addPost, getCurrentUserName  } from '../../utils/firebase';
import { addObserver, appState, dispatch } from '../../store';
import { getProductsAction } from '../../store/actions';

const post: Post = {
    name: "",
    ingredients: "",
    preparation: "",
    categorie: "",
    time: "",
    difficulty: "",
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
			const username = await getCurrentUserName()
			
			appState.posts?.forEach((post: any) => {
				const container = this.ownerDocument.createElement('section');

				const autor = this.ownerDocument.createElement('h1')
				autor.innerHTML = username;
				container.appendChild(autor)

				const image = this.ownerDocument.createElement('img');
				image.innerText = post.image;
				container.appendChild(image);

				const name = this.ownerDocument.createElement('h3');
				name.innerText = post.name;
				container.appendChild(name);

                const userName = this.ownerDocument.createElement('p');
				userName.innerText = post.userName;
				container.appendChild(userName);



                



				this.shadowRoot?.appendChild(container);
			});
		}
	}
}

customElements.define('card-list', CardList);
export default CardList;