import UserSidebar, { SidebarAttribute } from '../../components/left-bar/left-bar';
import { addObserver, appState, dispatch } from '../../store';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';
import { upLoadFile,  updateUserData } from '../../utils/firebase';

const profileData = {
  name: '',
};

class Settings extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    addObserver(this);
  }

  async connectedCallback() {
    const userId = appState.user.userId;
    console.log('ID del usuario:', userId);
    this.render();
  }

  

  changeScreen() {
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
  height: 20rem;
  width: 35rem;
  justify-content: center;
  gap: 2rem;
  margin: auto;
  margin-top: 8rem;
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
      `;

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
      pImage.type = 'file';
      pImage.addEventListener('change', async () => {
        const file = pImage.files?.[0];
        if (file) {
          await upLoadFile(file, appState.user.userId);
          alert('Foto de perfil actualizada.');
        }
      });
      formSection.appendChild(pImage);

      // Campo de nombre
      const nameLabel = document.createElement('label');
      nameLabel.innerText = 'User name';
      formSection.appendChild(nameLabel);

      const nameInput = document.createElement('input');
      nameInput.value = profileData.name;
      formSection.appendChild(nameInput);

      // Botón de guardar cambios
      const saveButton = document.createElement('button');
      saveButton.innerText = 'Save Changes';
      saveButton.classList.add('save-button');
      saveButton.addEventListener('click', async () => {
        const updatedName = nameInput.value;
        const userId = appState.user.userId;

        // Actualizar en Firebase
       await updateUserData (userId, updatedName)
      
        alert('Información actualizada exitosamente.');
        dispatch(navigate(Screens.PROFILE))
      });
      formSection.appendChild(saveButton);

      this.shadowRoot.appendChild(mainContainer);
    }
  }
}

customElements.define('app-settings', Settings);
