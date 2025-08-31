import React from "react";
import { useAuth } from "./components/context/AuthContext";
import Auth from "./components/Auth";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  const { user } = useAuth();

  return (
    <div className="app">
      {user ? (
        <>
          <h1>{user.displayName}'s Todo List</h1>
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
