import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // để chuyển trang
import courseData from "../../../db/course.json";
import lecturerData from "../../../db/lecturer.json";
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

    alert(
      `Thêm bài tập cho khóa học ${courseId}\nMô tả: ${description}\nFile: ${file.name}`
    );

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
            <button
              type="button"
              onClick={onClose}
              style={{ marginTop: "16px" }}
            >
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

  const navigate = useNavigate();

  // Giả sử giảng viên hiện tại là giảng viên đầu tiên trong lecturerData
  // Bạn có thể thay thế bằng lấy từ context, localStorage hoặc props
  const currentLecturerId = lecturerData.length > 0 ? lecturerData[0].id : null;

  useEffect(() => {
    try {
      if (!currentLecturerId) {
        setError("Không tìm thấy thông tin giảng viên hiện tại");
        return;
      }
      // Lọc khóa học đang tiến hành và thuộc giảng viên hiện tại
      const filteredCourses = courseData.filter(
        (course) =>
          course.courseStatus === "In Progress" &&
          course.instructor.id === currentLecturerId
      );
      setCourses(filteredCourses);
    } catch (err) {
      setError("Lỗi khi tải dữ liệu khóa học");
    }
  }, [currentLecturerId]);

  const handleAddAssignmentClick = (courseId) => {
    setSelectedCourseId(courseId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCourseId(null);
  };

  const handleCourseClick = (courseId) => {
    navigate(`/lecturer/course/${courseId}`);
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
              <li
                key={course.id}
                className="course-item"
                onClick={() => handleCourseClick(course.id)}
                style={{ cursor: "pointer" }}
              >
                <span>{course.title}</span>
                <span className="course-status">{course.courseStatus}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // ngăn không cho click lan ra <li>
                    handleAddAssignmentClick(course.id);
                  }}
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
