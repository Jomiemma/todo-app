import React, { useState } from "react";
import { useAuth } from "./context/AuthContext";
import "./styles/global.css";
import { FcGoogle } from "react-icons/fc";
import AuthForm from "./pages/Form";

function Auth() {
  return (
    <div className="auth-container">
      <AuthForm />
      {/* <button className="logi-btn" onClick={login}>
        <FcGoogle size={20} style={{ marginBottom: "-4px" }} />
      </button> */}
      {/* </>
      )} */}
    </div>
  );
}

export default Auth;
