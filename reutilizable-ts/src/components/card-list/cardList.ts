// import { appState, dispatch } from "../../store/index";
// import { Post } from "../../types/post";
// import Post, { Attribute } from "../card/card";


// class TaskList extends HTMLElement {
//     tasks: Task[] = [];

//     constructor() {
//         super();
//         this.attachShadow({ mode: 'open' });
//     }

//     connectedCallback() {
//         this.render();
//         this.tasks = appState.tasks

//         const taskListContainer = this.shadowRoot?.querySelector('.task-list');

//         this.tasks.forEach(task => {
//             // Verifica que 'uid', 'utitle', y 'description' existan
//             if (task.uid && task.utitle && task.description) {
//                 const taskItem = this.ownerDocument.createElement('task-item') as TaskItem;
//                 taskItem.setAttribute(Attribute.uid, task.uid.toString());
//                 taskItem.setAttribute(Attribute.utitle, task.utitle);
//                 taskItem.setAttribute(Attribute.description, task.description);
//                 taskItem.setAttribute(Attribute.completedTask, task.completedTask ? 'true' : 'false');


//                 taskListContainer?.appendChild(taskItem);
//             } else {
//                 console.error('Task is missing required attributes:', task);
//             }
//         });
                
//     }


//     render() {
//         if (!this.shadowRoot) return;

//         this.shadowRoot.innerHTML = `
//             <style>
//                 .task-list {
//                     display: flex;
//                     flex-direction: column;
//                     gap: 10px;
//                 }
//             </style>
//             <h2>Tasks</h2>
//             <div class="task-list">
//             </div>
//         `;
        
//     }
// }

// customElements.define('task-list', TaskList);
// export default TaskList



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