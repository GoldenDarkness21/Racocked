import Post, { Attribute } from '../../components/card/card';
import UserSidebar, { SidebarAttribute } from '../../components/left-bar/left-bar';
import { dispatch } from '../../store';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';
import { getUserProfile, updateUserProfile } from '../../utils/firebase';

const profileData = {
  name: '',
  email: '',
  bio: '',
  profileImage: '',
};

class Settings extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

  }

  async connectedCallback() {
    await this.loadProfileData();
    this.render();
  }

  async loadProfileData() {
    const user = await getUserProfile();
    if (user) {
      profileData.name = user.name || '';
      profileData.email = user.email || '';
      profileData.bio = user.bio || '';
      profileData.profileImage = user.profileImage || '';
    }
  }

  changeName(e: any) {
    profileData.name = e.target.value;
  }

  changeBio(e: any) {
    profileData.bio = e.target.value;
  }

  changeProfileImage(e: any) {
    const file = e.target.files[0];
    profileData.profileImage = file; // Guardamos la imagen localmente para subirla después
  }

  async saveChanges() {
    const success = await updateUserProfile(profileData);
    if (success) {
      alert('Perfil actualizado correctamente');
      dispatch(navigate(Screens.PROFILE));
    } else {
      alert('Hubo un error al actualizar el perfil');
    }
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
  
      const profileImage = document.createElement('img');
      profileImage.src = profileData.profileImage || 'ruta/a/imagen/por/defecto.jpg';
      profileSection.appendChild(profileImage);
  
      const profileName = document.createElement('h2');
      profileName.innerText = profileData.name || 'Nombre de Usuario';
      profileSection.appendChild(profileName);
  
      // Sección del formulario
      const formSection = document.createElement('div');
      formSection.classList.add('form-section');
      container.appendChild(formSection);
  
      // Campo de nombre
      const nameLabel = document.createElement('label');
      nameLabel.innerText = 'User name';
      formSection.appendChild(nameLabel);
  
      const nameInput = document.createElement('input');
      nameInput.value = profileData.name;
      nameInput.addEventListener('input', (e) => this.changeName(e));
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
      saveButton.classList.add('save-button');
      saveButton.addEventListener('click', () => this.saveChanges());
      formSection.appendChild(saveButton);
  
      // Agregar todo al Shadow DOM
      this.shadowRoot.appendChild(mainContainer);
    }
  }
  
  
}

customElements.define('app-settings', Settings);

export default Settings;