import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth, googleProvider } from "../firebase/config";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log("User logged in:", result.user);
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
