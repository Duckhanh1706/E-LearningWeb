import React, { useState } from "react";
import "./Video.css";

function UploadVideo({ courseId }) {
  const [titleVideo, setTitleVideo] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [videoList, setVideoList] = useState([]);

  const handleFileChange = (e) => {
    setUploadedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!titleVideo || !uploadedFile) {
      setMessage("Vui lòng nhập tiêu đề và chọn file video.");
      return;
    }

    const formData = new FormData();
    formData.append("titleVideo", titleVideo);
    formData.append("videoDescription", videoDescription);
    formData.append("uploaded_file", uploadedFile);

    try {
      const response = await fetch(
        `http://localhost:3000/teacher/teaching/${courseId}/create`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Upload video thành công!");
        setVideoList(data.courseData || []);
        // Reset form fields
        setTitleVideo("");
        setVideoDescription("");
        setUploadedFile(null);
        document.getElementById("fileInput").value = null;
      } else {
        setMessage(data.message || "Upload video thất bại!");
      }
    } catch (error) {
      console.error("Lỗi upload video:", error);
      setMessage("Lỗi kết nối server!");
    }
  };

  return (
    <div className="upload-video-container">
      <h2>Upload Video cho khóa học</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Tiêu đề video:</label>
          <input
            type="text"
            value={titleVideo}
            onChange={(e) => setTitleVideo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mô tả video:</label>
          <textarea
            value={videoDescription}
            onChange={(e) => setVideoDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Chọn file video:</label>
          <input
            id="fileInput"
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit">Upload Video</button>
      </form>

      {message && <p className="message">{message}</p>}

      <h3>Danh sách video trong khóa học:</h3>
      {videoList.length === 0 && <p>Chưa có video nào.</p>}
      <ul>
        {videoList.map((video) => (
          <li key={video._id}>
            <strong>{video.title}</strong> <br />
            {video.videoDescription || "Không có mô tả"}
            <br />
            <video controls>
              <source src={video.urlVideo} type="video/mp4" />
              Trình duyệt không hỗ trợ thẻ video.
            </video>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UploadVideo;
