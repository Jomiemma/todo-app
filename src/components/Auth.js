import React from "react";
import { useAuth } from "./context/AuthContext";

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
        <button onClick={login}>Login with Google</button>
      )}
    </div>
  );
}

export default Auth;
