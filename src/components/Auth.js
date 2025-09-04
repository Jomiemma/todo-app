import React from "react";
import { useAuth } from "./context/AuthContext";
import "./styles/global.css";
import { FcGoogle } from "react-icons/fc";

function Auth() {
  const { user, login, logout } = useAuth();

  return (
    <div className="auth-container">
      {user ? (
        <>
          <p>Welcome, {user.displayName}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button className="login-btn" onClick={login}>
          <FcGoogle size={35} style={{ marginBottom: "-4px" }} />
        </button>
      )}
    </div>
  );
}

export default Auth;
