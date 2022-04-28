import React, { useState } from "react";
import TodoList from "./components/TodoList";
import Toggle from "./components/Toggle";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFotB0WQT0PR4dUEJ_QR660-3kqu3FW6s",
  authDomain: "todolist-react-app-basic.firebaseapp.com",
  projectId: "todolist-react-app-basic",
  storageBucket: "todolist-react-app-basic.appspot.com",
  messagingSenderId: "409470472721",
  appId: "1:409470472721:web:ace29f57492d1f1644d7b0",
  measurementId: "G-4QNP6JL399",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  return (
    <div className="App">
      <TodoList />
      {/* <Toggle /> */}
    </div>
  );
}

export default App;
