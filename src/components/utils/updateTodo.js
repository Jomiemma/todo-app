import { db } from "../context/firebase/config";
import { doc, Timestamp, updateDoc } from "firebase/firestore";

export const updateTodo = async (userId, todoId, newTitle) => {
  const todoRef = doc(db, "users", userId, "todos", todoId);
  await updateDoc(todoRef, { title: newTitle });
};
