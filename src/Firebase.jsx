import { initializeApp } from "firebase/app";
import { getFirestore} from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBXaTkxG2bKgSFarWUvaeGV2ja2tWfv5Uw",
  authDomain: "meally-meaty.firebaseapp.com",
  projectId: "meally-meaty",
  storageBucket: "meally-meaty.appspot.com",
  messagingSenderId: "685170813467",
  appId: "1:685170813467:web:c99c524db2ee5766dba6be",
};

const app = initializeApp(firebaseConfig);

// Conexión a la DB de firebase
export const db = getFirestore(app);