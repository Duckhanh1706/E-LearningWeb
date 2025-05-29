import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./admin.css";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Giả sử check username/password cứng (bạn thay bằng API thực tế)
    if (username === "admin" && password === "admin123") {
      setError("");
      // Chuyển đến trang dashboard admin sau khi đăng nhập thành công
      navigate("/admin/dashboard");
    } else {
      setError("Tên đăng nhập hoặc mật khẩu không đúng");
    }
  };

  return (
    <div className="admin-login-container">
      <h2>Đăng nhập Admin</h2>
      <form onSubmit={handleSubmit} className="admin-login-form">
        <label>
          Tên đăng nhập:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nhập tên đăng nhập"
            required
          />
        </label>
        <label>
          Mật khẩu:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu"
            required
          />
        </label>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="login-button">
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
