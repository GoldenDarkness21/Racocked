
let db: any;
let auth: any;
//aqui lo qur hacemos es una funcion que inicialice firebase, pero no solo la base de datos sin o todo lo que yo
//necesite de firebase como la autentificacion 
export const getFirebaseInstance = async () => {
	if (!db) {
        //llamar base de datos
		const { getFirestore } = await import('firebase/firestore');
		const { initializeApp } = await import('firebase/app');
        //llamar autentificacion 
		const { getAuth } = await import('firebase/auth');

		const firebaseConfig = {
			apiKey: "AIzaSyCF1DeCs_1D2IF1ZZCKnNJ2DFqXjVMtwTA",
			authDomain: "racoked.firebaseapp.com",
			projectId: "racoked",
			storageBucket: "racoked.appspot.com",
			messagingSenderId: "959491826969",
			appId: "1:959491826969:web:17f0bd87d65be275265188",
			measurementId: "G-LF8WX1VKPJ"
		  };
		  

		const app = initializeApp(firebaseConfig);
        //mis servicios aqui son la base de datos y la autentificacion y los inicializo
		db = getFirestore(app);
		auth = getAuth(app);
	}
	return { db, auth };
};

export const addPost = async (post: any) => {
	try {
		const { db } = await getFirebaseInstance();
		const { collection, addDoc } = await import('firebase/firestore');

		const where = collection(db, 'post');
		await addDoc(where, post);
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

		const where = doc(db, 'users', userCredential.user.uid);
		const data = {
			age: credentials.age ?? null,
			name: credentials.name,
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
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		console.log('user credentials', userCredential);
		
		return userCredential; // Retorna las credenciales del usuario si es necesario

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