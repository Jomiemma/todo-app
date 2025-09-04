import React, { useState } from "react";
import { db } from "./firebase/config";
import { useAuth } from "./context/AuthContext";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "../components/styles/global.css";

function TodoForm() {
  const [title, setTitle] = useState("");
  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !currentUser) return;

    await addDoc(collection(db, "users", currentUser.uid, "todos"), {
      title,
      done: false,
      createdAt: serverTimestamp(),
    });

    setTitle("");
  };

  return (
    <form className="input-container" onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add Todo..."
      />
      <button type="submit" disabled={!title.trim()}>
        Add
      </button>
    </form>
  );
}

export default TodoForm;
