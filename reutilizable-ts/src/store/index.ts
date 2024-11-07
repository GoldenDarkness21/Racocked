import { reducer } from './reducer';
import Storage from '../utils/storage';
import { AppState, Observer } from '../types/store';
//este metodo determina cuando la autentificacion cambio, es decir alguien cierra sesion y alguien mas ingresa
import { onAuthStateChanged } from 'firebase/auth';
import { getFirebaseInstance } from '../utils/firebase';
import { Screens } from '../types/navegation';
import { navigate, setUserCredentials } from './actions';


const onAuth = async () => {
  const {auth} = await getFirebaseInstance();
  console.log('auth in index', auth);
  console.log('Pantalla actual', appState.screen)


  
  onAuthStateChanged(auth, (user) => {
    //le estamos diciendo que guarde el id en el objeto de users del estado global y navege al dashboard
    if (user) {
      console.log('user', user.uid);
      
      user.uid!== null ? dispatch(setUserCredentials({
        displayName: user.displayName,
        email: user.email,
        userID: user.uid
      })) : '';
      dispatch(navigate(Screens.DASHBOARD));
      console.log('Pantalla actual', appState.screen)
      console.log("Usuario", appState.user)

    }else{
      dispatch(navigate(Screens.LOGIN))
    }
  })
}
onAuth();
//El estado global, appState
const initialState: AppState = {
	screen: 'LOGIN',
	posts: [],
  user: {
    displayName: "",
    email: "",
    userID: ""
  },
};


//ahora el local y el session storage van a estar a cargo del firebase
export let appState = initialState;

let observers: Observer[] = [];



//Crear el dispatch
export const dispatch = (action: any) => {
	const clone = JSON.parse(JSON.stringify(appState));
	const newState = reducer(action, clone);
	appState = newState;

	// persistStore(newState);
	observers.forEach((o: any) => o.render());
};

//Agregar los observadores para los interesados, los suscritos
export const addObserver = (ref: any) => {
	observers = [...observers, ref];
};