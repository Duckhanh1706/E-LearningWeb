import React, { useState } from "react";
import "./course.css";

const HomeWork = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Hàm xử lý thay đổi tệp
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
    setSuccess("");
  };

  // Hàm xử lý upload tệp
  const handleUpload = async (e) => {
    e.preventDefault(); // Ngăn chặn reload trang khi submit form

    if (!file) {
      setError("Please select a file to upload.");
      setSuccess("");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file); // Thêm tệp vào FormData

      // Thực hiện upload tệp
      const response = await fetch("", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSuccess("Upload successful!"); // Thông báo thành công
        setError(""); // Reset thông báo lỗi
      } else {
        setError("Upload failed."); // Thông báo lỗi
        setSuccess(""); // Reset thông báo thành công
      }
    } catch (err) {
      setError("An error occurred during upload."); // Lỗi khi kết nối
      setSuccess(""); // Reset thông báo thành công
    }
  };

  return (
    <div className="course-container">
      <h2 className="course-title">Add Assignment</h2>
      <div className="course-list-wrapper">
        <form onSubmit={handleUpload} className="upload-form">
          <label htmlFor="file" className="file-input-label">
            Please choose a file:
          </label>
          <input type="file" id="file" onChange={handleFileChange} />
          {file && <p className="filename">Selected: {file.name}</p>}{" "}
          {/* Hiển thị tên tệp đã chọn */}
          <button type="submit">Upload</button>
        </form>

        {/* Hiển thị thông báo lỗi hoặc thành công */}
        {error && <div className="message error">{error}</div>}
        {success && <div className="message success">{success}</div>}
      </div>
    </div>
  );
};

export default HomeWork;
