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
import RegisterForm from "./components/page-component/Register/RegistrationForm";

// Dashboard layout và pages

import LecturerDashboard from "./routes/Dashboard/LecturerDashboard";
import StudentDashboard from "./routes/Dashboard/StudentDashboard";
import LecProfile from "./Pages/Lecture/profile/profile";
import StuProfile from "./Pages/Student/profile/profile";
import ManageCourses from "./Pages/Lecture/course/manageCourse";
import HomeWork from "./Pages/Lecture/course/homework";
import Schedule from "./Pages/Lecture/course/schedule";
import CurrentCourses from "./Pages/Lecture/course/currentCoures";
import CompletedCourses from "./Pages/Lecture/course/completedCourses";
import CourseDetail from "./components/page-component/Lecturer/courseDetail";
import EditProfile from "./Pages/Lecture/profile/edit-profile";
import RegisterStudentInfo from "./components/page-component/Register/Student";
import RegisterTeacherInfo from "./components/page-component/Register/Lecturer";
// Context
import { AuthProvider, useAuth } from "./components/context/AuthContext";
import CreateCourse from "./Pages/Lecture/course/createCourse";

import MyCourses from "./Pages/Student/course/courses";
import CourseList from "./Pages/Student/course/courseList";

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
      { path: "register", element: <RegisterForm /> },
      { path: "register-lecturer-info", element: <RegisterTeacherInfo /> },
      { path: "register-student-info", element: <RegisterStudentInfo /> },
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
      { path: "dashboard", element: <LecturerDashboard /> },
      { index: true, path: "profile", element: <LecProfile /> },
      { path: "courses", element: <ManageCourses /> },
      { path: "add-assignment", element: <HomeWork /> },
      { path: "completedCourses", element: <CompletedCourses /> },
      { path: "currentCourses", element: <CurrentCourses /> },
      { path: "schedule", element: <Schedule /> },
      { path: "course/:id", element: <CourseDetail /> },
      { path: "edit-profile", element: <EditProfile /> },
      { path: "create-Course", element: <CreateCourse /> },
      { path: "course/:id/add-assignment", element: <HomeWork /> },
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
      { path: "course", element: <MyCourses /> },
      { path: "viewCourse", element: <CourseList /> },
      { path: "edit-profile", element: <EditProfile /> },
      { path: "course/:courseId", element: <CourseDetail /> },
      { path: "course/:courseId/videos", element: <CourseVideoList /> },
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
