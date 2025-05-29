import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import Title from "../../common/Title";
import Button from "../../common/Button";
import FormGroup from "../../FormGroup";
import users from "../../../db/login.json";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function LoginForm({ handleCancel, showRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotError, setForgotError] = useState("");

  const navigate = useNavigate();
  const emailRef = useRef();
  const { user, login } = useAuth();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  // Khi user thay đổi (đăng nhập thành công), redirect đến trang phù hợp
  useEffect(() => {
    if (user) {
      navigate(`/${user.role}/profile`);
    }
  }, [user, navigate]);

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };

  const loginUser = () => {
    setError("");

    if (!isValidEmail(email)) {
      setError("Vui lòng nhập email hợp lệ.");
      return;
    }

    if (password === "" || password.length <= 4) {
      setError("Vui lòng nhập mật khẩu từ 5 ký tự trở lên.");
      return;
    }

    setIsLoading(true);

    const matchedUser = users.find(
      (user) =>
        user.email === email && user.password === password && user.role === role
    );

    setTimeout(() => {
      setIsLoading(false);

      if (matchedUser) {
        console.log("Login successful:", matchedUser);
        login(matchedUser);
        // Không gọi navigate tại đây nữa
      } else {
        setError("Email, mật khẩu hoặc vai trò không đúng.");
      }
    }, 800);
  };

  return (
    <div className="form fadeIn" style={{ maxWidth: 500 }}>
      <Title
        text="Login"
        classes="text-center mb-4"
        styles={{ fontSize: "40px" }}
      />
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

        <div className="role-options mb-3">
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

        {error && (
          <div className="error-message mb-2" style={{ color: "red" }}>
            {error}
          </div>
        )}

        <div className="d-flex alert-close gap-2 mb-2">
          <Button
            classes="bt-primary"
            type="submit"
            text={isLoading ? "Logging in..." : "Login"}
            disabled={isLoading}
          />
          <Button
            type="button"
            text="Register"
            onClick={() => navigate("/register")}
            classes="bt-primary"
          />
        </div>

        <div className="text-end mb-2">
          <button
            type="button"
            className="btn fg-pw"
            onClick={() => setShowForgotPassword(true)}
          >
            Forgot your password?
          </button>
        </div>
      </form>

      <p className="dk">
        Việc bạn tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý với điều{" "}
        khoản sử dụng của chúng tôi.
      </p>

      {/* Modal Forgot Password */}
      <div className="fw">
        {showForgotPassword && (
          <div className="modal-overlay">
            <div className="modal-content" style={{ textAlign: "center" }}>
              <h3>Quên mật khẩu?</h3>
              <p>
                Nhập email của bạn và chúng tôi sẽ gửi mã để khôi phục mật khẩu
              </p>
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="form-control"
                style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
              />
              {forgotError && <div style={{ color: "red" }}>{forgotError}</div>}
              <div className="modal-actions">
                <button
                  className="bt-primary"
                  onClick={() => {
                    if (!isValidEmail(forgotEmail)) {
                      setForgotError("Vui lòng nhập email hợp lệ.");
                      return;
                    }
                    alert("Hướng dẫn khôi phục đã được gửi tới email của bạn.");
                    setForgotEmail("");
                    setForgotError("");
                    setShowForgotPassword(false);
                  }}
                >
                  Gửi
                </button>
                <button
                  className="bt-secondary"
                  onClick={() => {
                    setForgotEmail("");
                    setForgotError("");
                    setShowForgotPassword(false);
                  }}
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
