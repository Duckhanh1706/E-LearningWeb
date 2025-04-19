import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import course from "../../../db/course.json";
import "./course.css";

const CurrentCourses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const filteredCourses = course.filter(
        (course) => course.status === "In Progress"
      );
      setCourses(filteredCourses);
    } catch (error) {
      setError("Error loading courses.");
    }
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

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
          <p>No courses in progress</p>
        )}
      </div>
    </div>
  );
};

export default CurrentCourses;
