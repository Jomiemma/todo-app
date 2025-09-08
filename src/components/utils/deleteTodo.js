import { db } from "../context/firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

export const deleteTodo = async (userId, todoId) => {
  const todoRef = doc(db, "users", userId, "todos", todoId);
  await deleteDoc(todoRef);
};
