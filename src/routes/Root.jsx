import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../components/context/AuthContext";
import Footer from "../components/common/Footer";

export default function Root() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="page-container">
      {/* Header / Navbar */}
      <nav className="navbar bg-primary text-light mb-4">
        <div className="navbar-logo">
          <a className="navbar-brand">
            <span className="logo">E</span>-Learning web
          </a>
          <button
            className="navbar-toggler btn btn-sm btn-close-white"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <ImCross /> : <FaBars />}
          </button>
        </div>
        <div className={`navbar-collapse ${isMenuOpen ? "open" : ""}`}>
          <ul className="navbar-nav me-auto">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
              onClick={handleNavClick}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
              onClick={handleNavClick}
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
              onClick={handleNavClick}
            >
              Contact
            </NavLink>

            {user ? (
              <>
                <NavLink
                  to={`/${user.role}/dashboard`}
                  className={({ isActive }) =>
                    isActive ? "nav-item active" : "nav-item"
                  }
                  onClick={handleNavClick}
                >
                  Profile
                </NavLink>
                <li
                  className="nav-item"
                  style={{ cursor: "pointer" }}
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? "nav-item active" : "nav-item"
                  }
                  onClick={handleNavClick}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive ? "nav-item active" : "nav-item"
                  }
                  onClick={handleNavClick}
                >
                  Register
                </NavLink>
              </>
            )}
          </ul>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      <div className={`dropdown-menu ${isMenuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
              onClick={handleNavClick}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
              onClick={handleNavClick}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
              onClick={handleNavClick}
            >
              Contact
            </NavLink>
          </li>

          {user ? (
            <>
              <li>
                <NavLink
                  to={`/${user.role}/dashboard`}
                  className={({ isActive }) =>
                    isActive ? "nav-item active" : "nav-item"
                  }
                  onClick={handleNavClick}
                >
                  Profile
                </NavLink>
              </li>
              <li
                className="nav-item"
                style={{ cursor: "pointer" }}
                onClick={handleLogout}
              >
                Logout
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? "nav-item active" : "nav-item"
                  }
                  onClick={handleNavClick}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive ? "nav-item active" : "nav-item"
                  }
                  onClick={handleNavClick}
                >
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Main content */}
      <main className="content-wrap">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
