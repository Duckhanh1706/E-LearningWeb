import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import courseData from "../../../db/course.json";
import "./course.css";

const CurrentCourses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCourses = courseData.filter(
      (course) => course.status === "In Progress"
    );
    setCourses(filteredCourses);
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  const handleCourseClick = (courseId) => {
    navigate(`/lecturer/course/${courseId}`, {
      state: { fromCurrentCourses: true }, // Truyền state từ CurrentCourses
    });
  };

  // Hàm chuyển hướng đến trang thêm bài tập
  const handleAddAssignment = (courseId) => {
    navigate(`/lecturer/course/${courseId}/add-assignment`);
  };

  return (
    <div className="course-container">
      <div className="course-list-wrapper">
        {courses.length > 0 ? (
          <ul className="course-list">
            {courses.map((course) => (
              <li key={course.id} className="course-item">
                <Link
                  to={`/lecturer/course/${course.id}`}
                  onClick={() => handleCourseClick(course.id)} // Xử lý sự kiện click
                  className="course-link"
                >
                  <span>{course.title}</span>
                </Link>
                <span className="course-status">{course.status}</span>

                {/* Nút button để thêm bài tập */}
                <button
                  onClick={() => handleAddAssignment(course.id)}
                  className="add-assignment-btn"
                >
                  <span className="plus-icon">+</span> Add Assignment
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No courses in progress</p>
        )}
      </div>
    </div>
  );
};

export default CurrentCourses;
