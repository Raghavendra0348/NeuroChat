
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  // Users will need to add their Firebase config here
  apiKey: "AIzaSyCPiwVC_iAXd9XEPq30OGL2_MV5KiSXUIg",
  authDomain: "sample-login-for-all.firebaseapp.com",
  projectId: "sample-login-for-all",
  storageBucket: "sample-login-for-all.firebasestorage.app",
  messagingSenderId: "673683309349",
  appId: "1:673683309349:web:bc8e0f4991774d94a750cc"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
