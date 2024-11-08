import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { appState, dispatch } from '../store';
import { navigate, setUserCredentials } from '../store/actions';
// import storage from './storage'
import { Screens } from '../types/store';

let db: any;
let auth: any;
let storage: any;
//aqui lo qur hacemos es una funcion que inicialice firebase, pero no solo la base de datos sin o todo lo que yo
//necesite de firebase como la autentificacion 
export const getFirebaseInstance = async () => {
	if (!db) {
        //llamar base de datos

		const { getFirestore } = await import('firebase/firestore');
		const { initializeApp } = await import('firebase/app');
        //llamar autentificacion 
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
        //mis servicios aqui son la base de datos y la autentificacion y los inicializo
		db = getFirestore(app);
		auth = getAuth(app);
		storage = getStorage();

		onAuthStateChanged(auth, async (user) => {
			if (user) {
			  // Usuario ha iniciado sesión
			  console.log("Usuario autenticado:", user);
			  console.log('data in appState', appState.user);

		
			  // Obtener datos adicionales del usuario desde Firestore
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
			  // Usuario no está autenticado
			  console.log("No hay usuario autenticado.");
			  localStorage.removeItem('user');
			  dispatch(navigate(Screens.LOGIN)); // Navega a la pantalla de login
		  }
		  })
	}
	return { db, auth, storage };
};

export const addPost = async (post: any) => {
	try { 
		const { db, auth } = await getFirebaseInstance();
		const { collection, addDoc } = await import('firebase/firestore');

		const user = auth.currentUser
		console.log('active user', user);
		let imageUrl = null

		if(post.image){
			const {ref, uploadBytes, getDownloadURL} =  await import('firebase/storage')
			const storageRef = ref(storage, `images/${appState.user.userId}/${post.name}` )
			await uploadBytes(storageRef, post.image)
			imageUrl = await getDownloadURL(storageRef)
			console.log('img url', imageUrl);
			
		}
		
		const where = collection(db, 'posts');
		const registerPost  = {
  			name: post.name,
  			ingredients: post.ingredients,
  			preparation: post.preparation,
  			categorie: post.categorie,
  			time: post.time,
  			difficulty: post.difficulty,
  			userUid: appState.user.userId,
			userName: appState.user.displayName,
			image: imageUrl

		}
		console.log('post to add en firebase', registerPost);
		
		await addDoc(where, registerPost);
		console.log('Se añadió con exito');
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

		// Configurar la persistencia en el almacenamiento local
		await setPersistence(auth, browserLocalPersistence);

		// Iniciar sesión con el correo y contraseña
		signInWithEmailAndPassword(auth, email, password);

		// Obtener y almacenar el nombre de usuario
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
		// Manejar errores de autenticación
		console.error("Error en la autenticación:", error.code, error.message);
		throw error; // Lanza el error para que se maneje en niveles superiores si se necesita
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

//   //obtener las credenciales del usuario activo 
// export const getUserCredentials = async () => {
// 	const {auth} = await getFirebaseInstance()
// 	return auth.currentUser;
// }


// export const getUserId = async () => {
// 	const credentials = await getUserCredentials()
// 	const id = credentials.uid
// 	return id
// }

export const getCurrentUserName = () => {
	const user = JSON.parse(localStorage.getItem('user') || '{}');
	return user?.name || null
} 


