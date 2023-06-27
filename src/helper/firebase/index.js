import firebase from 'firebase/compat/app';
import { getAuth } from 'firebase/auth';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY_FIREBASE,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN_FIREBASE,
  projectId: process.env.REACT_APP_PROJECT_ID_FIREBASE,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET_FIREBASE,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID_FIREBASE,
  appId: process.env.REACT_APP_APP_ID_FIREBASE
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

export const tokenListener = () => {
  firebase.auth().onIdTokenChanged(async (user) => {
    if (user) {
      const token = await user.getIdToken();
      const {
        claims: { role }
      } = await user.getIdTokenResult();
      sessionStorage.setItem('role', role);
      sessionStorage.setItem('token', token);
    }
  });
};

export const getFirebaseUidFromToken = async () => {
  try {
    const auth = getAuth();
    const decodedToken = await auth.currentUser.getIdTokenResult();
    const idCurrentUser = decodedToken.claims.email;
    return idCurrentUser;
  } catch (error) {
    console.error('Firebase Error:', error);
    throw error;
  }
};
