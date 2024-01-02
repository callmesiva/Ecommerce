import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBXKGzEowDj3Zjoow4IxniWxEpjUjYJGfM",
  authDomain: "ecommerce-20e59.firebaseapp.com",
  projectId: "ecommerce-20e59",
  storageBucket: "ecommerce-20e59.appspot.com",
  messagingSenderId: "781013030818",
  appId: "1:781013030818:web:99e0a1af7e60a2946384fb",
  measurementId: "G-2X8SL6CKRX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
