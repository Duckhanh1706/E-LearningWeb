import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../../common/Title";
import Button from "../../common/Button";
import FormGroup from "../../FormGroup";

export default function RegisterForm({ onRegistered }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const nameRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setRole("student");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) return alert("Please enter your full name!");
    if (!email.trim()) return alert("Please enter your email!");
    if (password.length <= 4)
      return alert("Password must be more than 4 characters!");

    const newUser = { name, email, password, role };
    console.log("Registration successful:", newUser);

    resetForm();

    if (
      window.confirm(
        "Registration successful! Click OK to continue filling info."
      )
    ) {
      if (role === "lecturer") {
        navigate("/register-lecturer-info");
      } else {
        navigate("/register-student-info");
      }
    }

    if (onRegistered) onRegistered(newUser);
  };

  return (
    <div className="form fadeIn register-form" style={{ maxWidth: 500 }}>
      <Title text="Register" classes="text-center mb-4" />
      <h3
        className="subtitle mb-3"
        style={{
          fontSize: "40px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        Create your account
      </h3>

      <form onSubmit={handleSubmit} autoComplete="off">
        <FormGroup
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          reffer={nameRef}
        />
        <FormGroup
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
        />
        <FormGroup
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />

        <div className="role-options mt-3">
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

        <div className="d-flex justify-content-between mt-4">
          <Button classes="btn-primary" type="submit" text="Register" />
        </div>
      </form>
    </div>
  );
}
