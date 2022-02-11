import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyDiqoK4GBpUMMd99KqAw5K48dTXiawKznI",
    authDomain: "find-valentine.firebaseapp.com",
    projectId: "find-valentine",
    storageBucket: "find-valentine.appspot.com",
    messagingSenderId: "255596807532",
    appId: "1:255596807532:web:df72a022ff9718942c9f49",
    measurementId: "G-DDM9JPLTE7"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore()
const auth = firebaseApp.auth();

const storage = firebase.storage();
const provider=new firebase.auth.GoogleAuthProvider();
export { auth, storage ,provider};

export default db; 