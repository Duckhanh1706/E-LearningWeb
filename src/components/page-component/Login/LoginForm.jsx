import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext"; // Import context
import Title from "../../common/Title";
import Button from "../../common/Button";
import FormGroup from "../../FormGroup";
import users from "../../../db/login.json"; // Temporary user data
import "./Login.css";
import { useNavigate } from "react-router-dom";

export default function LoginForm({ handleCancel, showRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const navigate = useNavigate();
  const emailRef = useRef();
  const { login } = useAuth(); // Get login function from context

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };

  const loginUser = () => {
    if (email === "") {
      alert("Please enter your email!");
      return;
    }
    if (password === "" || password.length <= 4) {
      alert("Please enter a valid password (min 5 characters)!");
      return;
    }

    const matchedUser = users.find(
      (user) =>
        user.email === email && user.password === password && user.role === role
    );

    if (matchedUser) {
      console.log("Login successful:", matchedUser);
      login(matchedUser); // Update login state with user info
      navigate(`/${role}/profile`); // Navigate to corresponding dashboard
    } else {
      alert("Invalid email, password or role.");
    }
  };

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  return (
    <div className="form fadeIn" style={{ maxWidth: 500 }}>
      <Title text="Login" classes={"text-center mb-4"} />
      <h3
        className="subtitle mb-3"
        style={{
          fontSize: "40px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        Enter your credentials
      </h3>

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
        />

        <div className="role-options">
          <label
            className={`role-option ${role === "student" ? "active" : ""}`}
          >
            <input
              type="radio"
              name="role"
              value="student"
              checked={role === "student"}
              onChange={(e) => setRole(e.target.value)}
              hidden
            />
            <span className="dot" /> Student
          </label>

          <label
            className={`role-option ${role === "lecturer" ? "active" : ""}`}
          >
            <input
              type="radio"
              name="role"
              value="lecturer"
              checked={role === "lecturer"}
              onChange={(e) => setRole(e.target.value)}
              hidden
            />
            <span className="dot" /> Lecturer
          </label>
        </div>

        <div className="d-flex alert-close">
          <Button classes="btn-custom" type="submit" text="Login" />
          <Button
            type="button-custom"
            text="Register"
            onClick={() => navigate("/register")}
            classes="btn-register"
          />
        </div>
        <div className="text-end mb-2">
          <button
            type="button"
            className="btn fg-pw"
            onClick={() => navigate("/forgot-password")}
            style={{ fontSize: "14px" }}
          >
            Forgot your password?
          </button>
        </div>
      </form>
    </div>
  );
}
