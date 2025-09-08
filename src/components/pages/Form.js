import { useState } from "react";
import { auth, db } from "../context/firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import PasswordInput from "../reusables/PasswordInput";
import "../styles/Form.css";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function AuthForm() {
  const [isSignup, setIsSignup] = useState(false);
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGoogleAuth = async () => {
    if (loading) return;
    setLoading(true);

    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);

      if (!snap.exists()) {
        await setDoc(userRef, {
          fullName: user.displayName || "",
          email: user.email,
          userName: user.displayName?.split(" ")[0] || "",
        });
      }
    } catch (err) {
      console.error("Google Auth error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (isSignup) {
        const userCred = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        await updateProfile(userCred.user, {
          displayName: userName,
        });

        await setDoc(doc(db, "users", userCred.user.uid), {
          fullName,
          userName,
          email: userCred.user.email,
          createdAt: new Date(),
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-form">
      <h2>{isSignup ? "Sign Up" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        {isSignup && (
          <>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <br />
            <input
              type="text"
              placeholder="User Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </>
        )}
        <br />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <PasswordInput
          placeholder="Enter Password"
          value={password}
          onChange={setPassword}
          showStrength={true}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <p>
          <button className="signup-btn" type="submit">
            {isSignup ? "Sign Up" : "Login"}
          </button>
          <br />
          <br />
          <button
            type="button"
            onClick={handleGoogleAuth}
            className="google-btn"
            disabled={loading}
          >
            {loading
              ? "Connecting..."
              : isSignup
              ? "Signup with Google"
              : "Continue with Google"}
            <FcGoogle />
          </button>
          <br />
          {isSignup
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <span className="form-link" onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Login" : "Signup"}
          </span>
        </p>
      </form>
    </div>
  );
}

export default AuthForm;
