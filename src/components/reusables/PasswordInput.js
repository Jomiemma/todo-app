import React, { useState, useEffect } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "../styles/global.css";

export default function PasswordInput({
  placeholder,
  value,
  onChange,
  required = true,
  showStrength = false,
}) {
  const [show, setShow] = useState(false);
  const [strength, setStrength] = useState("");

  useEffect(() => {
    if (!showStrength) return;

    const strongRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const mediumRegex =
      /^((?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,})$/;

    if (!value) {
      setStrength("");
    } else if (strongRegex.test(value)) {
      setStrength("strong");
    } else if (mediumRegex.test(value)) {
      setStrength("medium");
    } else {
      setStrength("weak");
    }
  }, [value, showStrength]);

  const strengthColor =
    strength === "strong" ? "green" : strength === "medium" ? "orange" : "red";
  const strengthLabel =
    strength === "strong"
      ? "Strong"
      : strength === "medium"
      ? "Medium"
      : "Weak";

  return (
    <div className="password-input">
      <div className="input-wrapper">
        <input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
        />
        <span className="toggle-icon" onClick={() => setShow(!show)}>
          {show ? <FiEyeOff size={20} /> : <FiEye size={20} />}
        </span>
      </div>

      {showStrength && (
        <div style={{ minHeight: "20px" }}>
          {value && (
            <p
              className={`strength ${strength}`}
              style={{ color: strengthColor }}
            >
              Password Strength: {strengthLabel}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
