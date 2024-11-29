import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { getFirestore, snapshotEqual} from 'firebase/firestore';
import { uploadBytes } from 'firebase/storage';
import { appState, dispatch } from '../store';
import { navigate, setUserCredentials } from '../store/actions';
import { Screens } from '../types/store';


let db: any;
let auth: any;
let storage: any;



export interface UserProfile {
    uid: string;
    name?: string;
    postImage?: string;
    [key: string]: any; 
}

export const getFirebaseInstance = async () => {
	if (!db) {


		const { getFirestore } = await import('firebase/firestore');
		const { initializeApp } = await import('firebase/app');
		const { getAuth } = await import('firebase/auth');
		const { getStorage} = await import('firebase/storage')

		const firebaseConfig = {
			apiKey: "AIzaSyCF1DeCs_1D2IF1ZZCKnNJ2DFqXjVMtwTA",
			authDomain: "racoked.firebaseapp.com",
			projectId: "racoked",
			storageBucket: "racoked.firebasestorage.app",
			messagingSenderId: "959491826969",
			appId: "1:959491826969:web:17f0bd87d65be275265188",
			measurementId: "G-LF8WX1VKPJ"
		  };
		  

		const app = initializeApp(firebaseConfig);
		db = getFirestore(app);
		auth = getAuth(app);
		storage = getStorage();

		onAuthStateChanged(auth, async (user) => {
			if (user) {
	
			  console.log("Usuario autenticado:", user);
			  console.log('data in appState', appState.user);

		
			  
			  const { doc, getDoc } = await import('firebase/firestore');
			  const userRef = doc(db, 'users', user.uid);
			  console.log ('id del user' , user.uid)
			  const userDoc = await getDoc(userRef);
			  console.log ('userDoc' , userDoc)
		
			  if (userDoc.exists()) {

				  const userData = userDoc.data();
				  localStorage.setItem('user', JSON.stringify(userData));
				  console.log("Nombre de usuario:", userData.displayName);
				  dispatch(setUserCredentials(userData))
				  console.log('user in appState', appState.user);
				  
				  dispatch(navigate(Screens.DASHBOARD))
			  }
		  } else {
			  
			  console.log("No hay usuario autenticado.");
			  localStorage.removeItem('user');
			  dispatch(navigate(Screens.LOGIN)); 
		  }
		  })
	}
	return { db, auth, storage };  

};


export const addPost = async (post: any) => {
	try { 
		const { db, auth } = await getFirebaseInstance(); 
		const { collection, addDoc } = await import('firebase/firestore');

		const user = auth.currentUser; 
		console.log('active user', user);
		let imageUrl = null;

		if (post.image) {
			
			const { ref, uploadBytes, getDownloadURL } = await import('firebase/storage');
			const storageRef = ref(storage, `images/${appState.user.userId}/${post.name}`);
			await uploadBytes(storageRef, post.image); 
			imageUrl = await getDownloadURL(storageRef); 
			console.log('img url', imageUrl);
		}

		
		const where = collection(db, 'posts');
		const postToAdd = {
			name: post.name,
			ingredients: post.ingredients,
			preparation: post.preparation,
			categorie: post.categorie,
			time: post.time,
			difficulty: post.difficulty,
			userUid: appState.user.userId,
			userName: appState.user.displayName,
			image: imageUrl,
			likes: post.likes,
		};

		
		const docRef = await addDoc(where, postToAdd);
		console.log('Documento creado con ID:', docRef.id);

		
		const { updateDoc } = await import('firebase/firestore');
		await updateDoc(docRef, { uid: docRef.id });
		console.log('UID añadido al documento:', docRef.id);

	} catch (error) {
		console.error('Error adding document', error);
	}
};



export const getProducts = async () => {
	try {
		const { db } = await getFirebaseInstance();
		const { collection, getDocs } = await import('firebase/firestore');

		const where = collection(db, 'posts');
		const querySnapshot = await getDocs(where);
		const data: any[] = [];

		querySnapshot.forEach((doc) => {
			data.push(doc.data());
		});

		return data;
	} catch (error) {
		console.error('Error getting documents', error);
	}
};

export const registerUser = async (credentials: any) => {
	try {
		const { auth, db } = await getFirebaseInstance();
		const { createUserWithEmailAndPassword } = await import('firebase/auth');
		const { doc, setDoc } = await import('firebase/firestore');

		const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
		await updateProfile(auth.currentUser, {
			displayName: credentials.name
		})

		const where = doc(db, 'users', userCredential.user.uid);
		const data = {
			email: credentials.email ?? null,
			displayName: credentials.name,
			userId: userCredential.user.uid
		};

		await setDoc(where, data);
		
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
};

export const loginUser = async (email: string, password: string) => {
	try {
		const { auth } = await getFirebaseInstance();
		console.log('auth', auth);
		
		const { signInWithEmailAndPassword, setPersistence, browserLocalPersistence } = await import('firebase/auth');


		await setPersistence(auth, browserLocalPersistence);

		signInWithEmailAndPassword(auth, email, password);


        const { doc, getDoc } = await import('firebase/firestore');
        const userRef = doc(db, 'users', appState.user.userId);
        const userDoc = await getDoc(userRef);
        
        if (userDoc.exists()) {
            const userData = userDoc.data();
            localStorage.setItem('user', JSON.stringify(userData));
            console.log("Nombre de usuario:", userData.username);
        }
        
        dispatch(navigate(Screens.DASHBOARD));

	} catch (error: any) {
		console.error("Error en la autenticación:", error.code, error.message);
		throw error; 
	}
};


export const logOut = async () => {
	const { auth } = await getFirebaseInstance();
	const { signOut } = await import('firebase/auth');
  
	try {
	  await signOut(auth); 
	  console.log("Usuario deslogueado exitosamente");
	} catch (error) {
	  console.error("Error al cerrar sesión:", error);
	}
  }


export const getCurrentUserName = () => {
	const user = JSON.parse(localStorage.getItem('user') || '{}');
	return user?.name || null
} 

export const addLikeUser = async (postId: string) => {
    try {
        const { db } = await getFirebaseInstance();
        const { doc, updateDoc, arrayUnion, getDoc } = await import('firebase/firestore');

        const userId = appState.user.userId;
        console.log("Current userId:", userId);

        if (!userId) {
            throw new Error("No user ID found in appState");
        }


        const postRef = doc(db, 'posts', postId);
        

        const docSnap = await getDoc(postRef);
        if (!docSnap.exists()) {
            throw new Error("post document doesn't exist");
        }


        await updateDoc(postRef, {
            likes: arrayUnion(userId)
        });

        console.log("User like added to post successfully", userId);
        return true;

    } catch (error) {
        console.error("Error in addLikeUser:", error);
        throw error;
    }
};

export const removeLikeUser = async (postId: string) => {
    try {
        const { db } = await getFirebaseInstance();
        const { doc, updateDoc, arrayRemove, getDoc } = await import('firebase/firestore');

        const userId = appState.user.userId; 
        console.log("Current userId:", userId);

        if (!userId) {
            throw new Error("No user ID found in appState");
        }


        const postRef = doc(db, 'posts', postId);
        

        const docSnap = await getDoc(postRef);
        if (!docSnap.exists()) {
            throw new Error(`Post with ID ${postId} does not exist`);
        }


        await updateDoc(postRef, {
            likes: arrayRemove(userId),
        });

        console.log(`User ${userId} like removed from post ${postId}`);
    } catch (error) {
        console.error("Error removing like:");
        throw error; 
    }
};

export const upLoadFile = async (file: File, id: string) => {
	const {storage} = await getFirebaseInstance();
	const {ref} = await import ('firebase/storage');

	const storageRef = ref(storage, 'imagesProfile/' + id);
	uploadBytes(storageRef, file).then((snapshot)=> {
		console.log('file uploaded');
	})

}


export const getFile = async (id: string) => {
	const {storage} = await getFirebaseInstance();
	const {ref, getDownloadURL} = await import ('firebase/storage');
	const storageRef = ref(storage, 'imagesProfile/' + id);
	const urlImg= await getDownloadURL(ref(storageRef)).then ((url) => {
		return url;
	}).catch((error) => {
		console.error(error);
	});
	return urlImg;
}





export const getCurrentUserProfile = async (): Promise<UserProfile> => {
    try {
        const { auth, db } = await getFirebaseInstance();
        const { onAuthStateChanged } = await import('firebase/auth');
        const { doc, getDoc } = await import('firebase/firestore');

        return new Promise<UserProfile>((resolve, reject) => {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const userDocRef = doc(db, 'users', user.uid);
                    const userDoc = await getDoc(userDocRef);

                    if (userDoc.exists()) {
                        const userData: UserProfile = {
                            uid: user.uid,
                            email: user.email,
                            ...userDoc.data(),
                        };
                        console.log('Usuario autenticado:', userData);
                        resolve(userData);
                    } else {
                        console.error('No se encontró el perfil del usuario en Firestore');
                        reject('Perfil no encontrado');
                    }
                } else {
                    console.log('No hay usuario autenticado');
                    reject('Usuario no autenticado');
                }
            });
        });
    } catch (error) {
        console.error('Error obteniendo el usuario actual:', error);
        throw error;
    }
};

export const getPostsForCurrentUser = async () => {
    try {
        const { auth, db } = await getFirebaseInstance();
        const { onAuthStateChanged } = await import('firebase/auth');
        const { collection, query, where, getDocs } = await import('firebase/firestore');

        return new Promise((resolve, reject) => {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const postsCollection = collection(db, 'posts');
                    const userPostsQuery = query(postsCollection, where('userUid', '==', user.uid));
                    const querySnapshot = await getDocs(userPostsQuery);

                    const userPosts: any[] = [];
                    querySnapshot.forEach((doc) => {
                        userPosts.push({ id: doc.id, ...doc.data() });
                    });

                    console.log('Posts del usuario:', userPosts);
                    resolve(userPosts);
                } else {
                    console.log('No hay usuario autenticado');
                    reject('Usuario no autenticado');
                }
            });
        });
    } catch (error) {
        console.error('Error obteniendo los posts del usuario:', error);
        throw error;
    }
};


export async function updateUserData(userId: string, updatedName: string) {
	try {
	  const { db } = await getFirebaseInstance();
	  const { doc, updateDoc } = await import('firebase/firestore');
	  const userRef = doc(db, 'users', userId);
	  

	  if (updatedName) {
		
		await updateDoc(userRef, {
		  displayName: updatedName,
		});
	  } else {
		console.error('El nombre no puede estar vacío.');
	  }
	} catch (error) {
	  console.error(error);
	}
  }
  
  


  export const NewgetProducts = async () => {
	try {
		const { db } = await getFirebaseInstance();
		const { collection, getDocs } = await import('firebase/firestore');

		const where = collection(db, 'products');
		const querySnapshot = await getDocs(where);
		const data: any[] = [];

		querySnapshot.forEach((doc) => {
			data.push(doc.data());
		});

		return data;
	} catch (error) {
		console.error('Error getting documents', error);
	}
};
