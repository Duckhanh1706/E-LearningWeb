import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Thêm useNavigate
import courseData from "../../../db/course.json";
import "./courseDetail.css"; // Import CSS

const CourseDetail = () => {
  const { id } = useParams(); // Lấy ID khóa học từ URL
  const [course, setCourse] = useState(null);
  const navigate = useNavigate(); // Khai báo navigate

  useEffect(() => {
    // Tìm khóa học từ file JSON dựa trên ID
    const foundCourse = courseData.find((course) => course.id === parseInt(id)); // Đảm bảo ID là kiểu số
    setCourse(foundCourse);
  }, [id]);

  if (!course) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <div className="course-detail-container">
      <h2 className="course-title">{course.title}</h2>

      {/* Section for Instructor */}
      <section className="course-section">
        <h3>Instructor</h3>
        <p>{course.instructor}</p>
      </section>

      {/* Section for Status */}
      <section className="course-section">
        <h3>Status</h3>
        <p>{course.status}</p>
      </section>

      {/* Section for Description */}
      <section className="course-section">
        <h3>Description</h3>
        <p>{course.description}</p>
      </section>

      {/* Section for Start Date */}
      <section className="course-section">
        <h3>Start Date</h3>
        <p>{course.startDate}</p>
      </section>

      {/* Section for End Date */}
      <section className="course-section">
        <h3>End Date</h3>
        <p>{course.endDate}</p>
      </section>

      {/* Section for Assignments */}
      <section className="course-section">
        <h3>Assignments</h3>
        <p>{course.assignments}</p>
      </section>

      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back
      </button>
    </div>
  );
};

export default CourseDetail;
