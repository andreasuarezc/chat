import React, {useEffect, useRef, useState} from "react";
import './App.css';
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollectionData} from "react-firebase-hooks/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyBWJwaCHv7YY2o0b-J0oDxBmO0QxZA7z9g",
  authDomain: "sofkachat-team-6befe.firebaseapp.com",
  projectId: "sofkachat-team-6befe",
  storageBucket: "sofkachat-team-6befe.appspot.com",
  messagingSenderId: "904436883533",
  appId: "1:904436883533:web:9bc7f8d057db8e95a37c04"
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>Sofka Chat</header>
      <SignOut />
      {user ? <ChatRoom /> : <SignIn />}
    </div>
  );
}

function ChatRoom(){
  return <p>Chat</p>
}

function SignIn(){
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return <button  onClick={signInWithGoogle}>Sign In With Google</button>
}

function SignOut(){
  return auth.currentUser && (
    <button  onClick={() => {
      auth.signOut();
    }}>Sign Out</button>
  );
}
export default App;
