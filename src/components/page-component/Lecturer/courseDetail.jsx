import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./courseDetail.css";

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // State mới để lưu video đang chỉnh sửa (id của video)
  const [editingVideoId, setEditingVideoId] = useState(null);
  // State form edit video
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editFile, setEditFile] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");
  const [editMessage, setEditMessage] = useState("");

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/teacher/teaching/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Không thể lấy dữ liệu khóa học");
        }
        const data = await response.json();
        setCourse(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [id]);

  const isFromCurrentCourses = location.state?.fromCurrentCourses || false;

  const handleAddVideo = () => {
    navigate(`/teacher/teaching/${course.id}/create-video`);
  };

  const handleDeleteVideo = async (videoId) => {
    if (!window.confirm("Bạn có chắc muốn xóa video này không?")) return;

    try {
      const res = await fetch(
        `http://localhost:5000/teacher/teaching/${course.id}/delete/${videoId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Xóa video thất bại");
      }

      alert("Xóa video thành công");

      // Cập nhật state xóa video khỏi list luôn
      setCourse((prevCourse) => ({
        ...prevCourse,
        videos: prevCourse.videos.filter((v) => v.id !== videoId),
      }));
    } catch (error) {
      alert("Lỗi khi xóa video: " + error.message);
    }
  };

  const handleAddDescription = (videoId) => {
    alert(`Thêm mô tả cho video có ID: ${videoId}`);
    // Hiện popup hoặc giao diện thêm mô tả video
  };

  // Mở form edit video
  const handleEditVideoClick = (video) => {
    setEditingVideoId(video.id);
    setEditTitle(video.title);
    setEditDescription(video.videoDescription || "");
    setEditFile(null);
    setEditError("");
    setEditMessage("");
  };

  // Đóng form edit video
  const handleCancelEdit = () => {
    setEditingVideoId(null);
    setEditError("");
    setEditMessage("");
  };

  // Xử lý submit form edit video
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    setEditError("");
    setEditMessage("");

    try {
      const formData = new FormData();
      formData.append("titleVideo", editTitle);
      formData.append("videoDescription", editDescription);
      if (editFile) formData.append("upload_file", editFile);

      const res = await fetch(
        `http://localhost:5000/teacher/teaching/${course.id}/edit/${editingVideoId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Cập nhật thất bại");
      }

      const data = await res.json();
      setEditMessage(data.message);

      // Cập nhật video trong state course.videos với dữ liệu mới
      setCourse((prevCourse) => {
        const updatedVideos = prevCourse.videos.map((v) =>
          v.id === editingVideoId
            ? {
                ...v,
                title: data.videoData.title,
                videoDescription: data.videoData.videoDescription,
                urlVideo: data.videoData.urlVideo,
                uploadDate: data.videoData.uploadDate,
              }
            : v
        );
        return { ...prevCourse, videos: updatedVideos };
      });

      // Đóng form edit
      setEditingVideoId(null);
    } catch (err) {
      setEditError(err.message);
    } finally {
      setEditLoading(false);
    }
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>Lỗi: {error}</div>;
  if (!course) return <div>Không tìm thấy khóa học.</div>;

  return (
    <div className="course-detail-container">
      <h2 className="course-title">{course.title}</h2>

      {/* ... các section khác như ban đầu ... */}

      <section className="course-section">
        <h3>Danh sách Video</h3>

        {course.videos && course.videos.length > 0 ? (
          <ul className="video-list">
            {course.videos.map((video) => (
              <li key={video.id} className="video-item">
                {editingVideoId === video.id ? (
                  // Form edit video
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

        {/* Nút thêm video */}
        {isFromCurrentCourses && (
          <button className="add-video-btn" onClick={handleAddVideo}>
            + Thêm Video
          </button>
        )}
      </section>

      <button onClick={() => navigate(-1)} className="back-button">
        ← Quay lại
      </button>
    </div>
  );
};

export default CourseDetail;
