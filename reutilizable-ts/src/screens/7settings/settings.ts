
import UserSidebar, { SidebarAttribute } from '../../components/left-bar/left-bar';
import { addObserver, appState, dispatch } from '../../store';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';
import { upLoadFile } from '../../utils/firebase';

const profileData = {
  name: '',
  email: '',
  password: '',
};

class Settings extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    addObserver(this);

  }

  async connectedCallback() {
    this.render();
  }


  async changeScreen() {
    dispatch(navigate(Screens.PROFILE));
}

  

  render() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <style>
.maincontainer {
  display: flex;
  height: 100vh;
  width: 100%;
  background-color: #FCF6F6;
}



.edit-profile-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 30rem;
  width: 50rem;
  justify-content: center;
  gap: 2rem;
  margin: auto;
  margin-top: 4rem;
  background-color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  padding: 2rem;
}

.profile-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.profile-section img {
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #fddde6;
}

.profile-section h2 {
  font-size: 1.2rem;
  font-weight: bold;
}

.form-section {
  display: flex;
  flex-direction: column;
  width: 60%;
  gap: 1rem;
}

.form-section label {
  font-size: 0.9rem;
  color: #555;
}

.form-section input {
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}

.form-section input[type="password"] {
  letter-spacing: 0.3em;
}

.save-button {
  padding: 0.8rem 2rem;
  background-color: #FFC7BE;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  align-self: flex-end;
}

.save-button:hover {
  background-color: #FFADA0;
}
        </style>
        `
      ;
  
      // Contenedor principal
      const mainContainer = document.createElement('section');
      mainContainer.classList.add('maincontainer');
  
      // Barra lateral
      const sidebar = document.createElement('div');
      sidebar.id = 'sidebar';
      const userSidebar = document.createElement('user-sidebar');
      userSidebar.setAttribute(SidebarAttribute.profilePicture, '');
      sidebar.appendChild(userSidebar);
      mainContainer.appendChild(sidebar);
  
      // Contenedor del formulario
      const container = document.createElement('section');
      container.classList.add('edit-profile-container');
      mainContainer.appendChild(container);
  
      // Sección de perfil
      const profileSection = document.createElement('div');
      profileSection.classList.add('profile-section');
      container.appendChild(profileSection);
  
  
  
      // Sección del formulario
      const formSection = document.createElement('div');
      formSection.classList.add('form-section');
      container.appendChild(formSection);
        

      // Campo de la imagen
      const pImage = this.ownerDocument.createElement('input');
      pImage.type= 'file'; 
      pImage.addEventListener('change', () => {
        console.log(pImage);
        const file = pImage.files?.[0]
        if (file) upLoadFile(file, appState.user.userId);
      })
      formSection.appendChild(pImage);


      // Campo de nombre
      const nameLabel = document.createElement('label');
      nameLabel.innerText = 'User name';
      formSection.appendChild(nameLabel);
  
      const nameInput = document.createElement('input');
      nameInput.value = profileData.name;
      formSection.appendChild(nameInput);
  
      // Campo de correo
      const emailLabel = document.createElement('label');
      emailLabel.innerText = 'Email';
      formSection.appendChild(emailLabel);
  
      const emailInput = document.createElement('input');
      emailInput.value = profileData.email;
      emailInput.type = 'email';
      formSection.appendChild(emailInput);
  
      // Campos de contraseña
      const passwordLabel = document.createElement('label');
      passwordLabel.innerText = 'Edit your password';
      formSection.appendChild(passwordLabel);
  
      const passwordInput = document.createElement('input');
      passwordInput.type = 'password';
      formSection.appendChild(passwordInput);
  
      const confirmPasswordLabel = document.createElement('label');
      confirmPasswordLabel.innerText = 'Confirm new password';
      formSection.appendChild(confirmPasswordLabel);
  
      const confirmPasswordInput = document.createElement('input');
      confirmPasswordInput.type = 'password';
      formSection.appendChild(confirmPasswordInput);
  
      // Botón Guardar
      const saveButton = document.createElement('button');
      saveButton.innerText = 'Save';


      saveButton.addEventListener('click', this.changeScreen);

      saveButton.classList.add('save-button');
      formSection.appendChild(saveButton);
  
      // Agregar todo al Shadow DOM
      this.shadowRoot.appendChild(mainContainer);
    }
  }
  
  
}

customElements.define('app-settings', Settings);

export default Settings;



// import UserSidebar, { SidebarAttribute } from '../../components/left-bar/left-bar';
// import { dispatch } from '../../store';
// import { navigate } from '../../store/actions';
// import { Screens } from '../../types/store';
// import { updateUserProfile } from '../../utils/firebase';

// const profileData = {
//   name: '',
//   email: '',
//   password: '',
// };

// class Settings extends HTMLElement {
//   constructor() {
//     super();
//     this.attachShadow({ mode: 'open' });
//   }

//   async connectedCallback() {
//     this.render();
//   }

//   async handleSave() {
//     // Obtén los campos de entrada
//     const nameInput = this.shadowRoot?.querySelector('#nameInput') as HTMLInputElement;
//     const emailInput = this.shadowRoot?.querySelector('#emailInput') as HTMLInputElement;
//     const passwordInput = this.shadowRoot?.querySelector('#passwordInput') as HTMLInputElement;
//     const confirmPasswordInput = this.shadowRoot?.querySelector('#confirmPasswordInput') as HTMLInputElement;

//     // Validación de contraseñas
//     if (passwordInput.value !== confirmPasswordInput.value) {
//       alert('Las contraseñas no coinciden. Por favor, verifica.');
//       return;
//     }

//     try {
//       // Llamar a la función de Firebase
//       const success = await updateUserProfile(
//         nameInput.value.trim(),
//         emailInput.value.trim(),
//         passwordInput.value.trim()
//       );

//       if (success) {
//         alert('Perfil actualizado exitosamente.');
//         dispatch(navigate(Screens.DASHBOARD));
//       } else {
//         alert('No se pudo actualizar el perfil. Intenta nuevamente.');
//       }
//     } catch (error) {
//       console.error('Error al actualizar el perfil:', error);
//       alert('Ocurrió un error al intentar actualizar el perfil. Por favor, inténtalo más tarde.');
//     }
//   }

//   render() {
//     if (this.shadowRoot) {
//       this.shadowRoot.innerHTML = `
//         <style>
//           .maincontainer {
//             display: flex;
//             height: 100vh;
//             width: 100%;
//             background-color: #FCF6F6;
//           }

//           .edit-profile-container {
//             display: flex;
//             flex-direction: row;
//             align-items: center;
//             height: 30rem;
//             width: 50rem;
//             justify-content: center;
//             gap: 2rem;
//             margin: auto;
//             margin-top: 4rem;
//             background-color: white;
//             box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
//             border-radius: 20px;
//             padding: 2rem;
//           }

//           .form-section {
//             display: flex;
//             flex-direction: column;
//             width: 60%;
//             gap: 1rem;
//           }

//           .form-section label {
//             font-size: 0.9rem;
//             color: #555;
//           }

//           .form-section input {
//             padding: 0.8rem;
//             border: 1px solid #ddd;
//             border-radius: 8px;
//             font-size: 1rem;
//           }

//           .save-button {
//             padding: 0.8rem 2rem;
//             background-color: #FFC7BE;
//             color: white;
//             border: none;
//             border-radius: 8px;
//             font-weight: bold;
//             cursor: pointer;
//             align-self: flex-end;
//           }

//           .save-button:hover {
//             background-color: #FFADA0;
//           }
//         </style>

//         <section class="maincontainer">
//           <div id="sidebar">
//             <user-sidebar></user-sidebar>
//           </div>

//           <section class="edit-profile-container">
//             <div class="form-section">
//               <label for="nameInput">User name</label>
//               <input id="nameInput" type="text" value="${profileData.name}" />

//               <label for="emailInput">Email</label>
//               <input id="emailInput" type="email" value="${profileData.email}" />

//               <label for="passwordInput">Edit your password</label>
//               <input id="passwordInput" type="password" />

//               <label for="confirmPasswordInput">Confirm new password</label>
//               <input id="confirmPasswordInput" type="password" />

//               <button class="save-button">Save</button>
//             </div>
//           </section>
//         </section>
//       `;

//       const saveButton = this.shadowRoot?.querySelector('.save-button') as HTMLButtonElement;
//       saveButton.addEventListener('click', this.handleSave.bind(this));
//     }
//   }
// }

// customElements.define('app-settings', Settings);

// export default Settings;







// import { appState, dispatch } from '../../store/index';
// import { navigate } from '../../store/actions';
// import { Screens } from '../../types/store';
// import { updateProfileUser } from '../../utils/firebase';
// import UserSidebar, { SidebarAttribute, } from "../../components/left-bar/left-bar";



// class Settings extends HTMLElement {
//     editedProduct: any;

//     constructor() {
//         super();
//         this.attachShadow({ mode: 'open' });

//         // Asegúrate de que appState.userData tenga valores válidos
//         this.editedProduct = appState.user
//             ? { ...appState.user } // Copiar datos del usuario
//             : { uid: '', displayName: ''}; // Estructura por defecto

//         this.editedProduct = {
//             uid: '',
//             displayName: '',
//         };

//         this.changeName = this.changeName.bind(this);
//         this.submitForm = this.submitForm.bind(this);

//         console.log("Estado inicial de appState.userData:", appState.user);
//     }


//     connectedCallback() {
//         if (!appState.user) {
//             console.error("No se encontraron datos de usuario en appState.");
//         } else {
//             this.editedProduct = { ...appState.user };
//         }
//         this.render();
//     }


//     changeName(e: any) {
//         const input = e.target as HTMLInputElement;
//         this.editedProduct.displayName = input.value;
//     }

//     async submitForm() {
//         if (!this.editedProduct || !this.editedProduct.uid) {
//             console.error("Los datos del producto editado están incompletos o son inválidos:", this.editedProduct);
//             return;
//         }

//         try {
//             console.log('Edited Product for FB', this.editedProduct);
//             await dispatch(updateProfileUser(this.editedProduct)); // Actualizar perfil
//             dispatch(navigate(Screens.PROFILE)); // Navegar al perfil
//         } catch (error) {
//             console.error("Error al enviar el formulario:", error);
//         }
//     }



//     navigate() {
//         dispatch(navigate(Screens.PROFILE));
//     }

//     async render() {
//         if (this.shadowRoot) {
//             this.shadowRoot.innerHTML = `
//                 <style>
//                 </style>


//                 <div id="sidebar">
//                         <user-sidebar ${SidebarAttribute.profilePicture}></user-sidebar>
//                     </div>

    
//             `


//             const container = document.createElement('section');
//             container.className = 'form-container';

//             const form = document.createElement('div');
//             form.className = 'form-div';

//             const title = document.createElement('h1');
//             title.innerText = 'Hello again!';
//             title.className = 'form-title';
//             form.appendChild(title);


//             // Form fields
//             const pName = document.createElement('input');
//             pName.placeholder = 'update your name';
//             pName.className = 'form-input';
//             pName.required = true;
//             pName.addEventListener('change', this.changeName);
//             form.appendChild(pName);


//             // Edit button
//             const save = document.createElement('button');
//             save.innerText = 'Edit Profile';
//             save.className = 'form-button';
//             save.addEventListener('click', this.submitForm);
//             form.appendChild(save);

//             // Profile button
//             const profile = document.createElement('button');
//             profile.innerText = 'Return to profile';
//             profile.className = 'form-button';
//             profile.addEventListener('click', this.navigate);
//             form.appendChild(profile);


//             container.appendChild(form);

//             this.shadowRoot.appendChild(container);
//         }
//     }
// }

// customElements.define('app-settings', Settings);
// export default Settings;