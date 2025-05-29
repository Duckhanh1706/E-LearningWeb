import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import Title from "../../common/Title";
import Button from "../../common/Button";
import FormGroup from "../../FormGroup";
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

  const loginUser = async () => {
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

    try {
      const response = await fetch(, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Đăng nhập thất bại.");
        setIsLoading(false);
        return;
      }

      const data = await response.json();

      if (data.status === "success") {
       
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);

        // Gọi API lấy profile có token trong header Authorization
        const profileResponse = await fetch(, {
          headers: {
            Authorization: Bearer +" "+ data.access_token,
            "Content-Type": "application/json",
          },
        });

        if (!profileResponse.ok) {
          setError("Không thể lấy thông tin người dùng.");
          setIsLoading(false);
          return;
        }

        const profileData = await profileResponse.json();

        // Cập nhật user context với thông tin profile mới
        login({
          id: profileData.id,
          name: profileData.name,
          email: profileData.email,
          role: profileData.role,
        });

        setIsLoading(false);
      } else {
        setError(data.message || "Đăng nhập không thành công.");
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setError("Có lỗi xảy ra, vui lòng thử lại sau.");
    }
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
