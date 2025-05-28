import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./courseDetail.css";
import courseData from "../../../db/course.json";

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [editingVideoId, setEditingVideoId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editFile, setEditFile] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");
  const [editMessage, setEditMessage] = useState("");

  useEffect(() => {
    const foundCourse = courseData.find((c) => c.id.toString() === id);
    if (foundCourse) {
      setCourse(foundCourse);
    } else {
      setError("Không tìm thấy khóa học.");
    }
    setLoading(false);
  }, [id]);

  const isFromCurrentCourses = location.state?.fromCurrentCourses || false;

  const handleDeleteVideo = (videoId) => {
    if (!window.confirm("Bạn có chắc muốn xóa video này không?")) return;

    setCourse((prevCourse) => ({
      ...prevCourse,
      videoLists: prevCourse.videoLists.filter((v) => v.id !== videoId),
    }));

    alert("Xóa video thành công");
  };

  const handleAddDescription = (videoId) => {
    alert(`Thêm mô tả cho video có ID: ${videoId}`);
  };

  const handleEditVideoClick = (video) => {
    setEditingVideoId(video.id);
    setEditTitle(video.title);
    setEditDescription(video.videoDescription || "");
    setEditFile(null);
    setEditError("");
    setEditMessage("");
  };

  const handleCancelEdit = () => {
    setEditingVideoId(null);
    setEditError("");
    setEditMessage("");
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setEditLoading(true);
    setEditError("");
    setEditMessage("");

    setTimeout(() => {
      setCourse((prevCourse) => {
        const updatedVideos = prevCourse.videoLists.map((v) =>
          v.id === editingVideoId
            ? {
                ...v,
                title: editTitle,
                videoDescription: editDescription,
              }
            : v
        );
        return { ...prevCourse, videoLists: updatedVideos };
      });

      setEditMessage("Cập nhật video thành công");
      setEditingVideoId(null);
      setEditLoading(false);
    }, 1000);
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>Lỗi: {error}</div>;
  if (!course) return <div>Không tìm thấy khóa học.</div>;

  return (
    <div className="course-detail-container">
      <h2 className="course-title">{course.title}</h2>

      <section className="course-info-section">
        <h3>Thông tin khóa học</h3>
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
        {course.student && (
          <p>
            <strong>Số học viên đã đăng ký:</strong> {course.student.length}
          </p>
        )}
      </section>

      <section className="course-section">
        <h3>Danh sách Video</h3>

        {course.videoLists && course.videoLists.length > 0 ? (
          <ul className="video-list">
            {course.videoLists.map((video) => (
              <li key={video.id} className="video-item">
                {editingVideoId === video.id ? (
                  <form onSubmit={handleEditSubmit} className="edit-video-form">
                    {editError && <p style={{ color: "red" }}>{editError}</p>}
                    {editMessage && (
                      <p style={{ color: "green" }}>{editMessage}</p>
                    )}
                    <div>
                      <label>Tiêu đề Video:</label>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label>Mô tả Video:</label>
                      <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                      />
                    </div>
                    <div>
                      <label>Tải video mới (nếu có):</label>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => setEditFile(e.target.files[0])}
                        disabled
                      />
                    </div>
                    <button type="submit" disabled={editLoading}>
                      {editLoading ? "Đang cập nhật..." : "Cập nhật"}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      disabled={editLoading}
                    >
                      Hủy
                    </button>
                  </form>
                ) : (
                  <>
                    <span>{video.title}</span>
                    <div className="video-buttons">
                      <button
                        className="delete-video-btn"
                        onClick={() => handleDeleteVideo(video.id)}
                      >
                        🗑 Xóa
                      </button>
                      <button
                        className="add-description-btn"
                        onClick={() => handleAddDescription(video.id)}
                      >
                        📝 Thêm mô tả
                      </button>
                      <button
                        className="edit-video-btn"
                        onClick={() => handleEditVideoClick(video)}
                      >
                        ✏️ Sửa
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>Chưa có video nào</p>
        )}
      </section>

      <button onClick={() => navigate(-1)} className="back-button">
        ← Quay lại
      </button>
    </div>
  );
};

export default CourseDetail;
