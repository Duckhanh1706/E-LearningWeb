import React, { useState } from "react";
import { useAuth } from "../../components/context/AuthContext";
import { useNavigate, Outlet } from "react-router-dom";
import "./admin.css";

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [message, setMessage] = useState("Chào mừng admin!");

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const handleInstructorClick = () => {
    navigate("/admin/instructor");
  };

  const handleStudentClick = () => {
    navigate("/admin/student");
  };

  return (
    <div className="admin-dashboard-container">
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li onClick={handleInstructorClick}>Quản lý giảng viên</li>
          <li onClick={handleStudentClick}>Quản lý học viên</li>
        </ul>
      </aside>

      <main className="admin-dashboard">
        <div className="admin-dashboard-header">
          <h1>Admin Dashboard</h1>
          <button className="logout-btn" onClick={handleLogout}>
            Đăng xuất
          </button>
        </div>

        <p>{message}</p>

        {/* Outlet sẽ render các component con của route /admin */}
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
