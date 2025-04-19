// src/components/CompletedCourses.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import course from "../../../db/course.json"; // Import dữ liệu từ file JSON
import "./course.css";

const CompletedCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Lọc các khóa học có trạng thái "Completed"
    setCourses(course.filter((course) => course.status === "Completed"));
  }, []);

  return (
    <div className="course-container">
      <div className="course-list-wrapper">
        {courses.length > 0 ? (
          <ul className="course-list">
            {courses.map((course) => (
              <li key={course.id} className="course-item">
                <Link
                  to={`/lecturer/course/${course.id}`}
                  className="course-link"
                >
                  <span>{course.title}</span>
                </Link>
                <span className="course-status">{course.status}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No completed courses</p>
        )}
      </div>
    </div>
  );
};

export default CompletedCourses;
