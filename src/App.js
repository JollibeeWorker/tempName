import React, { useRef, useState } from 'react';
import "./app.css";
import "./fonts/ProximaNovaBoldItalic.ttf";
import "./fonts/OpenSans-Light.ttf";
import googleLogo from "./img/google.png";

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import { Route, Link , Routes} from 'react-router-dom';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyAARSHVgO4jd2YcfKTcFK-jNQWKlSZRz98",
  authDomain: "tempname-44705.firebaseapp.com",
  projectId: "tempname-44705",
  storageBucket: "tempname-44705.appspot.com",
  messagingSenderId: "374494188478",
  appId: "1:374494188478:web:feca3f0959c1435f8f9fef",
  measurementId: "G-L98LYC5JH2"
})

const auth = firebase.auth();
const firestore = firebase.firestore();


function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <section >
        {user ? <ChatRoom /> : <SignIn />}
        

      </section>
      
      
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
    }).catch(function(error) {
      var errorCode = error.code;
      console.log(errorCode);
      alert(errorCode);
    
      var errorMessage = error.message;
      console.log(errorMessage);
      alert(errorMessage);
    });
  }
  return (
    <div class="signin slide-up-fade-in square">
    <img src={ googleLogo }/>
    
    <button onClick = {signInWithGoogle}>Sign in with Google</button>
    </div>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button onClick = {() => auth.signOut()}>Sign Out</button>
  )
}



function ChatRoom() {
  const messagesRef = firestore.collection('messages');
  const scrollDown = useRef();
  const query = messagesRef.orderBy('createdAt').limit(25);
  const [messages] = useCollectionData(query, {idField: 'id'});
  const [formValue, setFormValue] = useState('');

  const sendMessage = async(e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;

      await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid, 
        photoURL
      });
    

    
    

    setFormValue('')

    scrollDown.current.scrollIntoView({ behavior: 'smooth' });
  }

    return (
      <>
      
      <body>
      <header>CAMPUSconnect</header>
      <button class="signout" onClick = {() => auth.signOut()}>Sign Out</button>
        <div class="navbar">
          <a href="/app">User</a>
          
          
        </div>
        <div>
  
          {}
  
          {messages && messages.map(msg => <ChatMessage key = {msg.id} message = {msg}/>)}
  
        </div>
        <div ref = {scrollDown}>
  
        </div>
  
        
  
        <form onSubmit = {sendMessage}>
          <input value = {formValue} onChange = {(e) => setFormValue(e.target.value)}/>
          <div class="sendbutton">
          <button type = 'submit'>👌</button>
          </div>
        </form>
        </body>
      </>
    )
  

  
}

function ChatRoomPhysics() {
  const scrollDown = useRef();
  const physicsRef = firestore.collection('physics');
  const query = physicsRef.orderBy('createdAt').limit(25);
  const [messages] = useCollectionData(query, {idField: 'id'});
  const [formValue, setFormValue] = useState('');
  const sendMessage = async(e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;

    await physicsRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid, 
      photoURL
    });

    setFormValue('')

    scrollDown.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
    <div class="physics physicsBody"> 
      <button onClick = "">Physics</button>
    </div>
    <body>
    <header>CAMPUSconnect</header>
    <button class="signout" onClick = {() => auth.signOut()}>Sign Out</button>
      <div class="navbar">
        <a href="/app">User</a>
        
        
      </div>
      <div>

        {messages && messages.map(msg => <ChatMessage key = {msg.id} message = {msg}/>)}

      </div>
      <div ref = {scrollDown}>

      </div>

      <form onSubmit = {sendMessage}>
        <input value = {formValue} onChange = {(e) => setFormValue(e.target.value)}/>
        <div class="sendbutton">
        <button type = 'submit'>👌</button>
        </div>
      </form>
      </body>
    </>
  )
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  return (
    <div class="slide-up-fade-in">
    <div className={`message ${messageClass}`}>
      <img src = {photoURL} />
      <p>{text}</p>
    </div>
    </div>
      
  )
}

export default App;
