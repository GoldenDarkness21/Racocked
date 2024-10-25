import { reducer } from "./reducer";
import { AppState, Observer } from "../types/store";
import Storage from '../utils/storage';

//Este archivo maneja el estado global de la aplicación y contiene la lógica para observar 
// y notificar a los componentes cuando hay cambios en el estado.


//asi inicia la aplicacion 
const initialState: AppState = {
    screen:'DASHBOARD',
    cart: [],
    products: [],
};

//aqui creo el app state y le digo que sea igual a lo que hay enel local stoege y si no hay anada va a ser initial state 
export let appState = Storage.get('STORE', initialState);

let observers: Observer[] = [];


//esto es una funcion que recibe el estado de la app y va y actuliza eñ storagere
const persistStore = (state: any) => {
    //el set cambia lo que hay en store por x cosa
    Storage.set('STORE', state);
};


//Esta función se usa para despachar acciones que modifican el estado global 
export const dispatch = (action: any) => {
    const clone = JSON.parse(JSON.stringify(appState));
    const newState = reducer(action, clone);
    appState = newState;


    //Después de actualizar el appState, llamamos a persistStore() para guardar el nuevo estado en el localStorage.
    persistStore(newState);
    //Finalmente, notificamos a todos los "observadores" llamando a su método render(), 
    //lo que probablemente actualiza la interfaz de usuario.
    observers.forEach((observer) => observer.render());
};

//Esta función permite agregar un componente como observador del estado global. 
//Cada vez que el estado cambia, los observadores serán notificados mediante el método render().
//esta es la funcion que vamos a usar de en index, es el que va a observar en la aplicacion 
export const addObserver = (ref: any) => {
    observers = [...observers, ref];
};