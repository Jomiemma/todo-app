import React from "react";
import { useAuth } from "./components/context/AuthContext";
import Auth from "./components/Auth";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "../src/components/styles/global.css";

function App() {
  const { currentUser, logout } = useAuth();

  return (
    <div className="app">
      {currentUser ? (
        <>
          <div className="header-display">
            <h1>{currentUser.displayName}'s Todo List</h1>
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </div>
          <TodoForm />
          <TodoList />
          {/* // </div> */}
        </>
      ) : (
        <Auth />
      )}
    </div>
  );
}

export default App;
