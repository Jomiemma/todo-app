// import React, { useEffect, useState } from "react";
// import { db } from "./firebase/config";
// import { useAuth } from "./context/AuthContext";
// import {
//   collection,
//   onSnapshot,
//   query,
//   orderBy,
//   deleteDoc,
//   doc,
//   updateDoc,
// } from "firebase/firestore";
// import { toggleTodoDone } from "./utils/toggleTodoDone";
// import { deleteTodo } from "../utils/deleteTodo";
// import { updateTodo } from "../utils/updateTodo";

// function TodoList() {
//   const [todos, setTodos] = useState([]);
//   const { currentUser } = useAuth();

//   useEffect(() => {
//     if (!currentUser) return;

//     const q = query(
//       collection(db, "users", currentUser.uid, "todos"),
//       orderBy("createdAt", "desc")
//     );

//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const data = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setTodos(data);
//     });

//     return () => unsubscribe();
//   }, [currentUser]);

//   console.log(currentUser);
//   console.log("Current user in TodoList:", currentUser);

//   return (
//     <ul>
//       {todos.map((todo) => (
//         <li
//           key={todo.id}
//           style={{ display: "flex", alignItems: "center", gap: "8px" }}
//         >
//           <input
//             type="checkbox"
//             checked={todo.done}
//             onChange={() => toggleTodoDone(currentUser.uid, todo.id, todo.done)}
//           />

//           <span
//             style={{
//               textDecoration: todo.done ? "line-through" : "none",
//               color: todo.done ? "gray" : "black",
//             }}
//           >
//             {todo.title}
//           </span>
//         </li>
//       ))}
//     </ul>
//   );
// }

// export default TodoList;

// src/TodoList.js
import React, { useEffect, useState } from "react";
import { db } from "./firebase/config";
import { useAuth } from "./context/AuthContext";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

import { toggleTodoDone } from "./utils/toggleTodoDone";
import { deleteTodo } from "./utils/deleteTodo";
import { updateTodo } from "./utils/updateTodo";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const { currentUser } = useAuth();

  // editing state
  const [editingId, setEditingId] = useState(null);
  const [draftTitle, setDraftTitle] = useState("");

  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, "users", currentUser.uid, "todos"),
      orderBy("done", "asc"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(data);
    });

    return () => unsubscribe();
  }, [currentUser]);

  // Toggle done/undone (keeps your existing util)
  const handleToggle = (todoId, done) => {
    if (!currentUser) return;
    toggleTodoDone(currentUser.uid, todoId, done).catch(console.error);
  };

  // Delete (calls utils/deleteTodo)
  const handleDelete = (todoId) => {
    if (!currentUser) return;
    const ok = window.confirm("Delete this todo?");
    if (!ok) return;
    deleteTodo(currentUser.uid, todoId).catch(console.error);
  };

  // Start editing: set draft and open input
  const startEditing = (todo) => {
    setEditingId(todo.id);
    setDraftTitle(todo.title);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingId(null);
    setDraftTitle("");
  };

  // Save edit to Firestore (calls utils/updateTodo)
  const saveEdit = async () => {
    if (!currentUser || !editingId) return;
    const newTitle = draftTitle.trim();
    if (!newTitle) {
      // if user cleared text, cancel edit (or you could delete)
      cancelEditing();
      return;
    }
    try {
      await updateTodo(currentUser.uid, editingId, newTitle);
      setEditingId(null);
      setDraftTitle("");
    } catch (err) {
      console.error("Failed to update todo:", err);
    }
  };

  // handle keyboard while editing
  const handleKeyDown = (e) => {
    if (e.key === "Enter") saveEdit();
    if (e.key === "Escape") cancelEditing();
  };

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {todos.map((todo) => (
        <li
          key={todo.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 0",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          {/* checkbox */}
          <input
            type="checkbox"
            checked={!!todo.done}
            onChange={() => handleToggle(todo.id, todo.done)}
          />

          {/* title or edit input */}
          {editingId === todo.id ? (
            <input
              autoFocus
              value={draftTitle}
              onChange={(e) => setDraftTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={saveEdit} // save on blur
              style={{ flex: 1, padding: "6px" }}
            />
          ) : (
            <span
              style={{
                textDecoration: todo.done ? "line-through" : "none",
                color: todo.done ? "gray" : "black",
                flex: 1,
              }}
            >
              {todo.title}
            </span>
          )}

          {/* edit button */}
          {editingId !== todo.id && (
            <button
              onClick={() => startEditing(todo)}
              style={{
                marginLeft: 6,
                padding: "4px 8px",
                cursor: "pointer",
                borderRadius: 4,
              }}
            >
              Edit
            </button>
          )}

          {/* delete button */}
          <button
            onClick={() => handleDelete(todo.id)}
            style={{
              marginLeft: 6,
              padding: "4px 8px",
              cursor: "pointer",
              borderRadius: 4,
              background: "transparent",
              color: "crimson",
              border: "1px solid rgba(220,20,60,0.1)",
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
