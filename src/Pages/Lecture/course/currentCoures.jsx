import React, { useState, useEffect } from "react";
import courseData from "../../../db/course.json";
import "./course.css";

const AddAssignmentModal = ({ courseId, onClose }) => {
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file) {
      alert("Vui lòng chọn file để tải lên");
      return;
    }

    // Demo alert, bạn thay bằng API call upload file + mô tả
    alert(
      `Thêm bài tập cho khóa học ${courseId}\nMô tả: ${description}\nFile: ${file.name}`
    );

    // Reset form
    setDescription("");
    setFile(null);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>Thêm bài tập cho khóa học {courseId}</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Mô tả bài tập:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Nhập mô tả bài tập"
              required
              rows={3}
              style={{ width: "100%", resize: "vertical" }}
            />
          </div>
          <div style={{ marginTop: "12px" }}>
            <input type="file" onChange={handleFileChange} required />
          </div>
          <div style={{ marginTop: "16px" }}>
            <button type="submit">Thêm bài tập</button>
            <button type="button" onClick={onClose}>
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const CurrentCourses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  useEffect(() => {
    const filteredCourses = courseData.filter(
      (course) => course.status === "In Progress"
    );
    setCourses(filteredCourses);
  }, []);

  const handleAddAssignmentClick = (courseId) => {
    setSelectedCourseId(courseId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCourseId(null);
  };

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
                <span>{course.title}</span>
                <span className="course-status">{course.status}</span>
                <button
                  onClick={() => handleAddAssignmentClick(course.id)}
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

      {showModal && (
        <AddAssignmentModal courseId={selectedCourseId} onClose={closeModal} />
      )}
    </div>
  );
};

export default CurrentCourses;
