import { Actions, Screens } from '../types/store';
import { getProducts } from '../utils/firebase';

export const navigate = (screen: Screens) => {
	return {
		action: Actions.NAVIGATE,
		payload: screen,
	};
};

//este no recibe parametros por que no ess un set, solo trae cosas
export const getPost = async () => {
    //aqui capturamos todos los productos que esten en la base de datos
	const products = await getProducts(); //Firestore
	return {
		action: Actions.GETPRODUCTS,
		payload: products,
	};
};