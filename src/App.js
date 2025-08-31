import React from "react";
import { useAuth } from "./components/context/AuthContext";
import Auth from "./components/Auth";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  const { currentUser } = useAuth();

  return (
    <div className="app">
      {currentUser ? (
        <>
          <h1>{currentUser.displayName}'s Todo List</h1>
          <TodoForm />
          <TodoList />
        </>
      ) : (
        <Auth />
      )}
    </div>
  );
}

export default App;
