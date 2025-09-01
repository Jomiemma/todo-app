import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export const toggleTodoDone = async (userId, todoId, currentValue) => {
  try {
    const todoRef = doc(db, "users", userId, "todos", todoId);
    await updateDoc(todoRef, {
      done: !currentValue,
    });
  } catch (error) {
    console.error("Error updating todo status:", error);
  }
};
