import { Post } from "../../types/post";
import { addPost,  } from "../../utils/firebase";
import { addObserver, appState, dispatch } from "../../store";
import { getProductsAction, navigate } from "../../store/actions";
import styles from "./styles.css";
import UserSidebar, { SidebarAttribute, } from "../../components/left-bar/left-bar";
import { Screens } from "../../types/store";
import BottomNavbar, { NavbarAttribute } from '../../components/bottomBar/BottomNavbar';
import PostPopup from '../../components/PostPopup/PostPopup';


const post: Post = {
  name: "",
  ingredients: "",
  preparation: "",
  categorie: "",
  time: "",
  difficulty: "",
  image: "",
};

class Createpost extends HTMLElement {
  private popup: PostPopup | null = null;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.popup = document.createElement("post-popup") as PostPopup;
    this.popup.style.display = "none"; // Inicialmente oculto
    this.shadowRoot?.appendChild(this.popup);

    const style = document.createElement("style");
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
	console.log(e.target.value);
	
  }

  changePreparation(e: any) {
    post.preparation = e.target.value;
  }

  changeCategorie(e: any) {
    post.categorie = e.target.value;
	console.log(post.categorie)
  }

  changeTime(e: any) {
    post.time = e.target.value;
  }

  changeFile(e: any) {
    post.image = e.target.files?.[0];;
	console.log('img in form', post.image);
	
  }

  changeDifficulty(e: any) {
    post.difficulty = e.target.value;
	console.log(post.difficulty)
  }

//   changeImage (e: any) {
// 	const file =
//   }

  submitForm() {
	console.log(post)
    addPost(post);
	console.log('post added in create post');
	
	dispatch(navigate(Screens.DASHBOARD))
	console.log(appState.user);
	
  }

  async render() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
			<style>
body {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #fff7f5;
}

.main-section {
    display: flex;
    align-items: center;
    padding: 20px 20px 80px 20px;

}

.principal-section {
    width: 90vw;
    max-width: 400px;
    padding: 20px;
    padding-bottom: 80px; /* Añade espacio para la navbar */
    background-color: #FFD1C9;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 10px;
}


.image-section {
    width: 100%;
    height: 200px;
    background-color: #FCF6F6;
    border-radius: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.form-section {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.title {
    font-size: 14px;
    font-weight: bold;
    color: #333;
}

.label {
    font-size: 12px;
    color: #848484;
    font-weight: 400;
}

.name, .ingredients, .preparation, .category, .time, .difficulty {
    width: 100%;
    padding: 10px;
    border: 1px solid #FFB5A9;
    border-radius: 5px;
    font-size: 12px;
    color: #686868;
    box-sizing: border-box;
}

.ingredients, .preparation {
    height: 100px;
}

button {
    padding: 10px;
    background-color: #fca191;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 550;
    width: 100%;
}

button:hover {
    background-color: #f8b1a5;
}

.category-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

/* Media query para pantallas más grandes */
@media (min-width: 768px) {
    .principal-section {
        width: 60vw;
        height: 80vh;
        max-width: none;
        flex-direction: row;
        justify-content: space-between;

    }

    .image-section {
        width: 42%;
        height: auto;
    }

    .form-section {
        width: 50%;
        gap: 5px;
    }

    .name, .ingredients, .preparation, .category, .time, .difficulty {
        width: 80%;
    }

    .category-section {
        flex-direction: row;
        gap: 15px;
    }
}
   
			}


			</style>

				<div id="sidebar">
					<user-sidebar ${SidebarAttribute.profilePicture}></user-sidebar>
				</div>

        <bottom-navbar ${NavbarAttribute.activeIcon}="home"></bottom-navbar>

			`;
      const postContainer = this.ownerDocument.createElement("div");
      postContainer.classList.add("post-container"); 
      const section1 = this.ownerDocument.createElement("section");
      section1.classList.add("principal-section");
      const section2 = this.ownerDocument.createElement("section");
      section2.classList.add("image-section");
      const section3 = this.ownerDocument.createElement("section");
      section3.classList.add("form-section");
      const section4 = this.ownerDocument.createElement("section");
      section4.classList.add("category-section");
      const section5 = this.ownerDocument.createElement("section");
      section5.classList.add("main-section");

      // Título del formulario
      const title = this.ownerDocument.createElement("h1");
      title.innerText = "New Post!";
      section3.appendChild(title);
      title.classList.add("title");


	  //campo de la imagen
      const pImage = this.ownerDocument.createElement("input");
	  pImage.type = 'file';
      pImage.addEventListener('change', this.changeFile);
      section2.appendChild(pImage);
      pImage.classList.add("image");
	  const postImg = this.ownerDocument.createElement('img');
	  section2.appendChild(postImg)


      //campo del nombre
      const nameLabel = this.ownerDocument.createElement("label");
      nameLabel.innerText = "Recipe name";
      nameLabel.htmlFor = "recipe name";
      section3.appendChild(nameLabel);
      nameLabel.classList.add("label");

      const pName = this.ownerDocument.createElement("input");
      pName.addEventListener("change", this.changeName);
      section3.appendChild(pName);
      pName.classList.add("name");


      //campo de los ingredientes
      const ingredientsLabel = this.ownerDocument.createElement("label");
      ingredientsLabel.innerText = "Ingredients";
      ingredientsLabel.htmlFor = "ingredients";
      section3.appendChild(ingredientsLabel);
      ingredientsLabel.classList.add("label");

      const pIngredients = this.ownerDocument.createElement("input");
      pIngredients.addEventListener("change", this.changeIngredients);
      section3.appendChild(pIngredients);
      pIngredients.classList.add("ingredients");


      //campo de preparation
      const preparationLabel = this.ownerDocument.createElement("label");
      preparationLabel.innerText = "Preparation";
      preparationLabel.htmlFor = "preparation";
      section3.appendChild(preparationLabel);
      preparationLabel.classList.add("label");

      const pPreparation = this.ownerDocument.createElement("input");
      pPreparation.addEventListener("change", this.changePreparation);
      section3.appendChild(pPreparation);
      pPreparation.classList.add("preparation");


      // Contenedor para la categoría
      const categoryContainer = this.ownerDocument.createElement("div");

      // Etiqueta para el campo de categoría
      const categoryLabel = this.ownerDocument.createElement("label");
      categoryLabel.innerText = "Category";
      categoryLabel.htmlFor = "category";
      categoryContainer.appendChild(categoryLabel);
      categoryLabel.classList.add("label");

      // Selector de categoría
      const categorySelect = this.ownerDocument.createElement("select");
      categorySelect.id = "category";
      categorySelect.addEventListener("change", this.changeCategorie);
      categorySelect.classList.add("category");

      // Opciones de categoría
      const categories = [
        "Breakfast",
 		"Snacks",
 		"Desserts",
 		"Lunch",
 		"Drinks",
 		"Veggie",
 		"Fit",
      ];
      categories.forEach((category) => {
        const option = this.ownerDocument.createElement("option");
        option.value = category.toLowerCase();
        option.innerText = category;
        categorySelect.appendChild(option);
      });

      // Añadir el selector al contenedor
      categoryContainer.appendChild(categorySelect);

      // Añadir el contenedor de categoría a la sección principal
      section4.appendChild(categoryContainer);


      // Campo del tiempo
      const timeContainer = this.ownerDocument.createElement("div");
      const timeLabel = this.ownerDocument.createElement("label");
      timeLabel.innerText = "Time";
      timeLabel.htmlFor = "time";
      timeContainer.appendChild(timeLabel);
      timeLabel.classList.add("label");

      const pTime = this.ownerDocument.createElement("input");
      pTime.addEventListener("change", this.changeTime);
      timeContainer.appendChild(pTime);
      pTime.classList.add("time");

      section4.appendChild(timeContainer);


      // Contenedor para la dificultad
      const difficultyContainer = this.ownerDocument.createElement("div");

      // Etiqueta para el campo de dificultad
      const difficultyLabel = this.ownerDocument.createElement("label");
      difficultyLabel.innerText = "Difficulty";
      difficultyLabel.htmlFor = "difficulty";
      difficultyContainer.appendChild(difficultyLabel);
      difficultyLabel.classList.add("label");

      // Selector de dificultad
      const difficultySelect = this.ownerDocument.createElement("select");
      difficultySelect.id = "difficulty";
      difficultySelect.addEventListener("change", this.changeDifficulty);
      difficultySelect.classList.add("difficulty");

      postContainer.addEventListener("click", () => {
        if (this.popup) {
            this.popup.setPost(post); // Setea el post actual en el popup
            this.popup.style.display = "block"; // Muestra el popup
        }
    });

      // Opciones de dificultad
      const difficulties = ["Easy", "Medium", "High"];
      difficulties.forEach((level) => {
        const option = this.ownerDocument.createElement("option");
        option.value = level.toLowerCase();
        option.innerText = level;
        difficultySelect.appendChild(option);
      });

      // Añadir el selector al contenedor
      difficultyContainer.appendChild(difficultySelect);

      section4.appendChild(difficultyContainer);

      //boton para publicar un post
      const publish = this.ownerDocument.createElement("button");
      publish.innerText = "Publish";
      publish.addEventListener("click", this.submitForm);

      // Agregar la segunda y tercera sección dentro de section 1 y la 1 al shadowroot
      section1.appendChild(section2);
      section1.appendChild(section3);
      section3.appendChild(section4);
      section3.appendChild(publish);
      section3.appendChild(postContainer);
      section5.appendChild(this.shadowRoot.querySelector("#sidebar")!);
      section5.appendChild(section1);
      this.shadowRoot.appendChild(section5);

    }
  }
}

customElements.define("app-createpost", Createpost);
export default Createpost;
