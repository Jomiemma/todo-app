import React, { useState } from "react";
import { auth, db } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import PasswordInput from "../reusables/PasswordInput";
import "../styles/Form.css";
import { FcGoogle } from "react-icons/fc";

function AuthForm() {
  const [isSignup, setIsSignup] = useState(false);
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

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
        {/* <p> */}
        {/* {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "} */}
        {/* <button type="button" onClick={() => setIsSignup(!isSignup)}> */}
        {/* {isSignup ? "Login" : "Sign Up"} */}
        {/* </button> */}
        {/* </p> */}

        <p>
          <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>
          <span >
            or signup using <FcGoogle />
          </span>
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span className="form-link" onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Login" : "Signup"}
          </span>
        </p>
      </form>
    </div>
  );
}

export default AuthForm;
