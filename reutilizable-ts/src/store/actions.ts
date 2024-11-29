import { Actions, Screens } from '../types/store';
import { getProducts, getCurrentUserProfile, getPostsForCurrentUser } from '../utils/firebase';

export const navigate = (screen: Screens) => {
	return {
		action: Actions.NAVIGATE,
		payload: screen,
	};
};

export const getProductsAction = async () => {
	const products = await getProducts(); 
	return {
		action: Actions.GETPRODUCTS,
		payload: products,
	};
};

export const setUserCredentials = (user: any) => {
    return {
        action: Actions.SETUSERCREDENTIALS,
        payload: user,
    }
};

export const getCurrentUserProfileAction = async () => {
	const currentStateProfile = await getCurrentUserProfile(); 
	return {
		action: Actions.GETCURRENTUSERPROFILE,
		payload: currentStateProfile,
	};
};

export const getPostsForCurrentUserAction = async () => {
	const currentUserPosts = await getPostsForCurrentUser(); 
	return {
		action: Actions.GETPOSTSFORCURRENTUSER,
		payload: currentUserPosts,
	};
};




