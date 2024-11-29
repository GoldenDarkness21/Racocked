import { reducer } from './reducer';
import Storage from '../utils/storage';
import { AppState, Observer } from '../types/store';
import { onAuthStateChanged } from 'firebase/auth';
import { getFirebaseInstance } from '../utils/firebase';
import { Screens } from '../types/navegation';
import { navigate, setUserCredentials } from './actions';

const initialState: AppState = {
	screen: 'LOGIN',
	posts: [],
  	user: {
    displayName: "",
    email: "",
    userId: ""
  },
  	selectedUserId: "",
};


export let appState = initialState;

let observers: Observer[] = [];


export const dispatch = (action: any) => {
	const clone = JSON.parse(JSON.stringify(appState));
	const newState = reducer(action, clone);
	appState = newState;

	observers.forEach((o: any) => o.render());
};

export const addObserver = (ref: any) => {
	observers = [...observers, ref];
};