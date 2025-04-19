import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../common/Title";
import Button from "../common/Button";
import FormGroup from "../FormGroup";

export default function LoginForm({ handleCancel, loggedIn, showRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "") {
      return alert("Please enter your email!");
    }
    if (password === "" || password.length <= 4) {
      return alert("Password must be more than 4 characters!");
    }

    const userData = {
      email,
      password,
      id: Math.floor(Math.random() * 1000),
    };
    console.log("User logged in:", userData);
    loggedIn(); // thực hiện hành động sau đăng nhập
    resetForm();
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const goToForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="form fadeIn login-form" style={{ maxWidth: 500 }}>
      <Title text="Login" classes="text-center mb-4" />
      <h4 className="subtitle mb-3">Enter your credentials</h4>

      <form onSubmit={handleSubmit}>
        <FormGroup
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          reffer={emailRef}
        />
        <FormGroup
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          reffer={passwordRef}
        />

        <div className="d-flex alert-close justify-content-between mt-3 mb-2">
          <Button classes="btn-primary" type="submit" text="Login" />
          <Button
            classes="btn-close-dark"
            text="x"
            type="button"
            onClick={handleCancel}
          />
          <Button type="button" text="Register" onClick={showRegister} />
        </div>

        <div className="text-end mt-2">
          <button
            type="button"
            className="forgot-password-link"
            onClick={goToForgotPassword}
          >
            Forgot your password?
          </button>
        </div>
      </form>
    </div>
  );
}
