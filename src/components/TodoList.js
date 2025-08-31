import React, { useEffect, useState } from "react";
import { db } from "./firebase/config";
import { useAuth } from "./context/AuthContext";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, "users", currentUser.uid, "todos")
      // orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log("snapshot size:", snapshot.size);
      snapshot.docs.forEach((doc) => console.log(doc.id, doc.data()));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(data);
    });

    return () => unsubscribe();
  }, [currentUser]);

  console.log(currentUser);
  console.log("Current user in TodoList:", currentUser);

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.title} {todo.done ? "✔" : ""}
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
