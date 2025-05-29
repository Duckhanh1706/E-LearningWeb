import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// Routing
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
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
import LecProfile from "./Pages/Lecture/profile/profile";
import ManageCourses from "./Pages/Lecture/course/manageCourse";
import HomeWork from "./Pages/Lecture/course/homework";
import Schedule from "./Pages/Lecture/course/schedule";
import CurrentCourses from "./Pages/Lecture/course/currentCoures";
import CompletedCourses from "./Pages/Lecture/course/completedCourses";
import CourseDetail from "./components/page-component/Lecturer/courseDetail";
import EditLecProfile from "./Pages/Lecture/profile/edit-profile";
import RegisterTeacherInfo from "./components/page-component/Register/Lecturer";
import CreateCourse from "./Pages/Lecture/course/createCourse";

import { AuthProvider, useAuth } from "./components/context/AuthContext";

import MyCourses from "./Pages/Student/course/myCourses";
import CourseList from "./Pages/Student/course/courseList";
import CourseVideoList from "./components/page-component/Student/VideoList";
import CourseRegister from "./Pages/Student/course/enrollCourse";
import StuCourseDetail from "./components/page-component/Student/CourseDetail";
import RegisterStudentInfo from "./components/page-component/Register/Student";
import StudentDashboard from "./routes/Dashboard/StudentDashboard";
import EditStuProfile from "./Pages/Student/profile/editProfile";
import StudentProfile from "./Pages/Student/profile/profile";

import AdminLogin from "./Pages/Admin/adminlogin";
import AdminDashboard from "./Pages/Admin/dashboard";
import ManageStudent from "./Pages/Admin/ManageStudent";
import ManageInstructor from "./Pages/Admin/ManageInstructor";
import AllInstructorsPage from "./Pages/Admin/Lecturer/allInstructor";
import CreateInstructorPage from "./Pages/Admin/Lecturer/createInstructor";
import PendingList from "./Pages/Admin/Lecturer/pending/pending";
import InstructorDetail from "./Pages/Admin/Lecturer/instructorDetail";
import AdminHomePage from "./Pages/Admin/adminHomePage";
import ApproveInstructor from "./Pages/Admin/Lecturer/pending/approve";
import RejectInstructor from "./Pages/Admin/Lecturer/pending/reject";
import UpdateInstructor from "./Pages/Admin/Lecturer/update";
import DeleteInstructor from "./Pages/Admin/Lecturer/delete";
import AllStudentsPage from "./Pages/Admin/Student/allStudent";
import CreateStudentPage from "./Pages/Admin/Student/createStudent";
import StudentDetail from "./Pages/Admin/Student/studentDetail";
import DeleteStudent from "./Pages/Admin/Student/delete";
import UpdateStudent from "./Pages/Admin/Student/update";

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
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
    children: [
      //{ index: true, element: <Navigate to="dashboard" replace /> }, // redirect mặc định
      { path: "dashboard", element: <AdminHomePage /> },
      { path: "student", element: <ManageStudent /> },
      { path: "instructor", element: <ManageInstructor /> },
      { path: "instructor/pending", element: <PendingList /> },
      {
        path: "instructor/pending/:instructorId/approve",
        element: <ApproveInstructor />,
      },
      {
        path: "instructor/pending/:instructorId/reject",
        element: <RejectInstructor />,
      },
      {
        path: "instructor/create-instructor",
        element: <CreateInstructorPage />,
      },
      { path: "instructor/view", element: <AllInstructorsPage /> },
      { path: "instructor/:instructorId", element: <InstructorDetail /> },
      {
        path: "instructor/update-instructor/:instructorId",
        element: <UpdateInstructor />,
      },
      {
        path: "instructor/delete-instructor/:instructorId",
        element: <DeleteInstructor />,
      },
      { path: "student/view", element: <AllStudentsPage /> },
      {
        path: "student/create-student",
        element: <CreateStudentPage />,
      },
      { path: "student/:studentId", element: <StudentDetail /> },
      {
        path: "student/delete-student/:studentId",
        element: <DeleteStudent />,
      },
      {
        path: "student/update-student/:studentId",
        element: <UpdateStudent />,
      },
    ],
  },
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
    element: <LecturerDashboard />,
    children: [
      { path: "dashboard", element: <LecturerDashboard /> },
      { index: true, path: "profile", element: <LecProfile /> },
      { path: "courses", element: <ManageCourses /> },
      { path: "add-assignment", element: <HomeWork /> },
      { path: "completedCourses", element: <CompletedCourses /> },
      { path: "currentCourses", element: <CurrentCourses /> },
      { path: "schedule", element: <Schedule /> },
      { path: "course/:id", element: <CourseDetail /> },
      { path: "edit-lec-profile", element: <EditLecProfile /> },
      { path: "create-Course", element: <CreateCourse /> },
      { path: "course/:id/add-assignment", element: <HomeWork /> },
    ],
  },
  {
    path: "/student",
    element: <StudentDashboard />,
    children: [
      { path: "dashboard", element: <StudentDashboard /> },
      { path: "profile", element: <StudentProfile /> },
      { path: "coursecmp", element: <MyCourses /> },
      { path: "viewCourse", element: <CourseList /> },
      { path: "edit-stu-profile", element: <EditStuProfile /> },
      { path: "course/:courseId", element: <StuCourseDetail /> },
      { path: "course/:courseId/videos", element: <CourseVideoList /> },
      { path: "enroll-course", element: <CourseRegister /> },
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
