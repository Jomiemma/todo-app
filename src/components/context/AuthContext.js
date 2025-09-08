import { createContext, useContext, useEffect, useState } from "react";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth, googleProvider, db } from "../firebase/config";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUserProfile = async (user) => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);

    await setDoc(
      userRef,
      {
        name: user.displayName || "Annoymous",
        email: user.email,
        photoURL: user.photoURL || null,
        createdAt: serverTimestamp(),
      },
      {
        merge: true,
      }
    );
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = () => {
    signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        await createUserProfile(result.user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ currentUser: user, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
