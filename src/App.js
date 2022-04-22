import React from "react";
import './styles/app.sass'
import TodoList from "./components/TodoList";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <TodoList />
    </div>
  );
}

export default App;
