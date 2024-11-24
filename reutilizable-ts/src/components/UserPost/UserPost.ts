
import css from './UserPost.css';
import { Post } from '../../types/post';
import { addObserver, appState } from '../../store';

class UserPost extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        addObserver(this);
    }

    async render() {
        if (this.shadowRoot) {
            const userPosts: Post[] = appState.posts;
            const styles = document.createElement('style');
            styles.textContent = css;

            this.shadowRoot.innerHTML = `
                <h1 id="title">User Posts</h1>
                <section id="postSection">
                    ${userPosts
                        .map(
                            (post) => `
                                <component-post
                                    photo="${post.image}"
                                    userName="${appState.user.displayName}"
                                    name="${post.name}">
                                </component-post>
                            `
                        )
                        .join('')}
                </section>
            `;
            this.shadowRoot.appendChild(styles);
        }
    }
}

customElements.define('user-post', UserPost);
export default UserPost;
