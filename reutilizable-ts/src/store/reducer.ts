import { Actions } from '../types/store';

export const reducer = (currentAction: any, currentState: any) => {
	const { action, payload } = currentAction;

	switch (action) {
		case Actions.NAVIGATE:
			return {
				...currentState,
				screen: payload,
			};

		case Actions.GETPRODUCTS:
			return {
				...currentState,
                //aqui le decimos a quien le interesa lo que obtuvimos, en este caso es el arreglo de productos
				products: payload,
			};

		default:
			return currentState;
	}
};