import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import courseData from "../../../db/course.json";
import studentData from "../../../db/student.json";
import "./courseDetail.css";

const StuCourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const currentStudent = Array.isArray(studentData)
    ? studentData[0]
    : studentData;

  if (!currentStudent) {
    return <div>Không tìm thấy học viên hiện tại.</div>;
  }

  const course = courseData.find((c) => c.id === Number(courseId));

  if (!course) {
    return <div>Không tìm thấy khóa học với ID: {courseId}</div>;
  }

  const isEnrolled = Array.isArray(currentStudent.course)
    ? currentStudent.course.includes(Number(courseId))
    : currentStudent.course === Number(courseId);

  if (!isEnrolled) {
    return (
      <div>
        Học viên <strong>{currentStudent.name}</strong> chưa đăng ký khóa học
        này.
        <br />
        <button onClick={() => navigate(-1)} className="back-button">
          ← Quay lại
        </button>
      </div>
    );
  }

  const registeredStudentsCount = 1;

  return (
    <div className="course-detail-container">
      <h2>{course.title}</h2>

      <section className="course-info-section">
        <p>
          <strong>Mô tả:</strong> {course.description}
        </p>

        {course.instructor && (
          <>
            <p>
              <strong>Giảng viên:</strong> {course.instructor.name}
            </p>
            <p>
              <strong>Email:</strong> {course.instructor.email}
            </p>
            <p>
              <strong>Mô tả giảng viên:</strong> {course.instructor.description}
            </p>
          </>
        )}

        {course.price !== undefined && (
          <p>
            <strong>Giá:</strong> {course.price.toLocaleString()} VNĐ
          </p>
        )}

        {course.courseStatus && (
          <p>
            <strong>Trạng thái khóa học:</strong> {course.courseStatus}
          </p>
        )}

        <p>
          <strong>Số học viên đã đăng ký:</strong> {registeredStudentsCount}
        </p>
      </section>

      {/* Danh sách video */}
      <section className="course-section">
        <h4>📺 Danh sách Video</h4>
        {course.videoLists && course.videoLists.length > 0 ? (
          <ul className="video-list">
            {course.videoLists.map((video) => (
              <li key={video.id} className="video-item">
                <span>
                  <strong>{video.title}</strong>
                </span>
                <div className="video-buttons">
                  <button
                    className="watch-video-btn"
                    onClick={() => alert("Xem video: " + video.title)}
                  >
                    ▶️ Xem video
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Chưa có video nào</p>
        )}
      </section>

      {/* Bài tập & Nộp bài */}
      <section className="exercise-section">
        <h4>📝 Bài tập & Nộp bài</h4>
        {course.videoLists && course.videoLists.length > 0 ? (
          <ul className="exercise-list">
            {course.videoLists.map((video) => (
              <li key={video.id} className="exercise-item">
                <p>
                  <strong>Bài tập cho: {video.title}</strong>
                </p>
                <form
                  className="upload-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const fileInput = e.target.elements[`file-${video.id}`];
                    if (fileInput.files.length === 0) {
                      alert("Vui lòng chọn file để nộp bài!");
                      return;
                    }
                    const file = fileInput.files[0];
                    alert(`Đã nộp file: ${file.name} cho bài: ${video.title}`);
                    e.target.reset();
                  }}
                >
                  <input
                    type="file"
                    name={`file-${video.id}`}
                    accept=".pdf,.doc,.docx,.zip"
                    required
                  />
                  <button type="submit" className="submit-exercise-btn">
                    📤 Nộp bài
                  </button>
                </form>
              </li>
            ))}
          </ul>
        ) : (
          <p>Chưa có bài tập nào</p>
        )}
      </section>

      <button onClick={() => navigate(-1)} className="back-button">
        ← Quay lại
      </button>
    </div>
  );
};

export default StuCourseDetail;
