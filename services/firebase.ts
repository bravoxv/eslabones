import { initializeApp, getApps } from "firebase/app";
import {
    getAuth,
    GoogleAuthProvider,
    GithubAuthProvider,
    OAuthProvider,
    Auth
} from "firebase/auth";

// Tu configuración de Firebase
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

let auth: Auth;
let googleProvider: GoogleAuthProvider;
let githubProvider: GithubAuthProvider;
let discordProvider: OAuthProvider;

// Verificar si la configuración existe antes de inicializar
// Esto previene que la app se rompa si no se ha configurado el .env
if (!firebaseConfig.apiKey) {
    console.warn("⚠️ Firebase no está configurado. El inicio de sesión no funcionará.");
    console.warn("Por favor, crea un archivo .env con tus credenciales de Firebase.");

    // Mock objects para evitar crash
    auth = {} as Auth;
    googleProvider = new GoogleAuthProvider();
    githubProvider = new GithubAuthProvider();
    discordProvider = new OAuthProvider('discord.com');
} else {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
    githubProvider = new GithubAuthProvider();
    discordProvider = new OAuthProvider('discord.com');
    discordProvider.addScope('identify');
    discordProvider.addScope('email');
}

export { auth, googleProvider, githubProvider, discordProvider };
