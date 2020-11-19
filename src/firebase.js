import firebase from 'firebase';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCFjR5_pWDyGqjC4EMflVXfPdb4olscbL4",
  authDomain: "clientsprojects-5ea6d.firebaseapp.com",
  databaseURL: "https://clientsprojects-5ea6d.firebaseio.com",
  projectId: "clientsprojects-5ea6d",
  storageBucket: "clientsprojects-5ea6d.appspot.com",
  messagingSenderId: "556479572383",
  appId: "1:556479572383:web:93a1a4090271002fe535aa",
  measurementId: "G-N3GFP72DVT"
};
  const firebaseApp= firebase.initializeApp(firebaseConfig);
  const db= firebaseApp.firestore();
  const storage= firebase.storage();
  const provider = new firebase.auth.GoogleAuthProvider();

  export{storage,db,firebaseApp,provider, firebase as default};