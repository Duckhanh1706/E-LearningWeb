import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../../components/context/AuthContext";
import Footer from "../../../components/common/Footer";
import "./dashboard.css";

export default function Dashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsMenuOpen(false);
  };

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="dashboard-container">
      {/* Header / Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">
          <a className="navbar-brand">
            <span className="logo">E</span> -Learning Web
          </a>
          <button className="navbar-toggler" onClick={toggleMenu}>
            {isMenuOpen ? "Close Menu" : "Open Menu"}
          </button>
        </div>

        <div className={`navbar-collapse ${isMenuOpen ? "open" : ""}`}>
          <ul className="navbar-nav">
            {/* Nếu người dùng là giảng viên */}
            {user && user.role === "student" && (
              <>
                <NavLink
                  to="/student/profile"
                  className={({ isActive }) =>
                    isActive ? "nav-item active" : "nav-item"
                  }
                  onClick={handleNavClick}
                >
                  Profile
                </NavLink>
                <NavLink
                  to="/student/coursecmp"
                  className={({ isActive }) =>
                    isActive ? "nav-item active" : "nav-item"
                  }
                  onClick={handleNavClick}
                >
                  Courses Completed
                </NavLink>
                <NavLink
                  to="/student/viewCourse"
                  className={({ isActive }) =>
                    isActive ? "nav-item active" : "nav-item"
                  }
                  onClick={handleNavClick}
                >
                  Schedule
                </NavLink>
                <NavLink
                  to="/student/cart"
                  className={({ isActive }) =>
                    isActive ? "nav-item active" : "nav-item"
                  }
                  onClick={handleNavClick}
                >
                  Cart
                </NavLink>
              </>
            )}

            {/* Mục Logout */}
            {user && (
              <li
                className="nav-item"
                style={{ cursor: "pointer" }}
                onClick={handleLogout}
              >
                Logout
              </li>
            )}
          </ul>
        </div>
      </nav>
      <main className="dashboard-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
