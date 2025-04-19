import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// Routing
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

// Public layout và pages
import Root from "./routes/Root";
import Contact from "./routes/HomeLayout/contact";
import Home from "./routes/HomeLayout/home";
import About from "./routes/HomeLayout/about";
import Index from "./routes/HomeLayout/index";
import Login from "./routes/HomeLayout/Login";
import Register from "./routes/HomeLayout/Register";

// Dashboard layout và pages

import LecturerDashboard from "./routes/Dashboard/LecturerDashboard";
import StudentDashboard from "./routes/Dashboard/StudentDashboard";
import LecProfile from "./Pages/Lecture/profile/profile";
import StuProfile from "./Pages/Student/profile/profile";
import ManageCourses from "./Pages/Lecture/course/manageCourse";
import AddAssignment from "./Pages/Lecture/course/AddAssignment";
import Schedule from "./Pages/Lecture/course/schedule";
import CurrentCourses from "./Pages/Lecture/course/currentCoures";
import CompletedCourses from "./Pages/Lecture/course/completedCourses";
import CourseDetail from "./components/page-component/Lecturer/courseDetail";
import EditProfile from "./Pages/Lecture/profile/edit-profile";
// Context
import { AuthProvider, useAuth } from "./components/context/AuthContext";
import CreateCourse from "./Pages/Lecture/course/createCourse";
import LecturerDashboardHome from "./Pages/Lecture/dashboard/home";

// Route guard
function ProtectedRoute({ children, role }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
}

// Router config
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Index /> },
      { path: "home", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/lecturer",
    element: (
      <ProtectedRoute role="lecturer">
        <LecturerDashboard />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <LecturerDashboardHome /> },
      { path: "dashboard", element: <LecturerDashboard /> },
      { path: "profile", element: <LecProfile /> },
      { path: "courses", element: <ManageCourses /> },
      { path: "add-assignment", element: <AddAssignment /> },
      { path: "completedCourses", element: <CompletedCourses /> },
      { path: "currentCourses", element: <CurrentCourses /> },
      { path: "schedule", element: <Schedule /> },
      { path: "course/:id", element: <CourseDetail /> },
      { path: "edit-profile", element: <EditProfile /> },
      { path: "create-Course", element: <CreateCourse /> },
    ],
  },
  {
    path: "/student",
    element: (
      <ProtectedRoute role="student">
        <StudentDashboard />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", element: <StudentDashboard /> },
      { path: "profile", element: <StuProfile /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
