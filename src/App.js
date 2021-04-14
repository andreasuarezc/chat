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
  const messageRef = firestore.collection("messages");
  const query = messageRef.orderBy("createdAt").limitToLast(30);
  const [messages] = useCollectionData(query, {idField: 'id'})
  const dummy = useRef();

  const [formValue, setFormValue] = useState('');

  useEffect(()=>{
    dummy.current.scrollIntoView({behavior : 'smooth'})
  })

  const sendMessage = async(e) => {
    e.preventDefault();
    const {uid, photoURL, displayName} = auth.currentUser;

    await messageRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      displayName,
      photoURL
    });

    setFormValue('');
  };

  return <main>
    <div>
    {messages && messages.map(msn => <ChatMessage key={msn.id} message={msn} />)}
    
    </div>
    <div>
      <form onSubmit={sendMessage}>
      <input value={formValue} onChange={(e) =>{
        setFormValue(e.target.value)
      }}
      placeholder="Escribe aquí"
      />
      <button type="submit" disabled={!formValue}>Send</button>
      </form>
    </div>
    <span ref={dummy}></span>
  </main>
}



function ChatMessage({message}){
  const {text, uid, photoURL, displayName} = message;

  const messageOrderClass = uid === auth.currentUser.uid ? 'send' : 'received';

  return (<div children={"message "+ messageOrderClass}>
    <img src = {photoURL} alt = {"avatar"}/>
    <small>{displayName}</small>
    <p>{text}</p>
  </div>)
}

export function SignIn(){
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return <button data-testid={"btn-signin"}  onClick={signInWithGoogle}>Ingresar</button>
}

function SignOut(){
  return auth.currentUser && (
    <button  onClick={() => {
      auth.signOut();
    }}>Sign Out</button>
  );
}
export default App;
