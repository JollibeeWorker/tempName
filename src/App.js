import React, { useRef, useState } from 'react';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

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
      <header>


      </header>
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
    <button onClick = {signInWithGoogle}>Sigh in with Google</button>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button onClick = {() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom() {
  const messagesRef = firestore.collection('messages');
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
  }

  return (
    <>
      <div>

        {messages && messages.map(msg => <ChatMessage key = {msg.id} message = {msg}/>)}

      </div>
      <div>



      </div>

      <form onSubmit = {sendMessage}>
        <input value = {formValue} onChange = {(e) => setFormValue(e.target.value)}/>
        <button type = 'submit'>👌</button>
      </form>
    
    </>
  )
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  return (
    <div className={`message ${messageClass}`}>
      <img src = {photoURL} />
      <p>{text}</p>
    </div>
  )
}

export default App;
