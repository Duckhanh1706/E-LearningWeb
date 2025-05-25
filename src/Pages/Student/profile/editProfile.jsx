import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import studentData from "../../../db/student.json"; // Dữ liệu mock
import "./profile.css";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    contact: {
      email: "",
      phone: "",
    },
  });
  const [uploadedFile, setUploadedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (studentData) {
      setFormData({
        name: studentData.name || "",
        bio: studentData.bio || "",
        contact: {
          email: studentData.email || "",
          phone: studentData.phoneNumber || "",
        },
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      setFormData((prev) => ({
        ...prev,
        contact: {
          ...prev.contact,
          phone: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    setUploadedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      // Tạo form data để gửi multipart/form-data
      const data = new FormData();
      data.append("name", formData.name);
      if (uploadedFile) {
        data.append("uploaded_file", uploadedFile);
      }
      data.append("bio", formData.bio);
      data.append("contact[email]", formData.contact.email); // email cố định, ko đổi
      data.append("contact[phone]", formData.contact.phone);

      // Giả lập gọi API backend
      // Bạn đổi URL thành API thật của bạn
      const response = await fetch("/api/student/profile/update", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        throw new Error("Lỗi khi cập nhật thông tin");
      }

      const result = await response.json();

      setMessage(result.message || "Cập nhật thành công!");
      // Cập nhật lại form data theo dữ liệu trả về
      if (result.updatedData) {
        setFormData((prev) => ({
          ...prev,
          ...result.updatedData,
          contact: {
            email: result.updatedData.contact?.email || prev.contact.email,
            phone: result.updatedData.contact?.phone || prev.contact.phone,
          },
        }));
        setUploadedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = null; // reset input file
        }
      }
    } catch (error) {
      setMessage(error.message);
    }

    setLoading(false);
  };

  const handleCancel = () => {
    navigate("/student/profile");
  };

  return (
    <div className="profile-container">
      <div className="container">
        <h2>Chỉnh sửa thông tin học viên</h2>
        {message && (
          <p style={{ marginBottom: "15px", color: "green" }}>{message}</p>
        )}
        <form className="edit-profile-form" onSubmit={handleSubmit}>
          <label>
            Tên:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Email (không thể sửa):
            <input
              type="email"
              name="email"
              value={formData.contact.email}
              disabled
              readOnly
            />
          </label>

          <label>
            Số điện thoại:
            <input
              type="tel"
              name="phone"
              value={formData.contact.phone}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Mô tả (Bio):
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              placeholder="Viết mô tả về bạn..."
            />
          </label>

          <label>
            Ảnh đại diện (Upload mới):
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
          </label>

          <div className="form-buttons">
            <button
              type="submit"
              className="btn-edit-profile"
              disabled={loading}
            >
              {loading ? "Đang cập nhật..." : "Lưu thay đổi"}
            </button>
            <button
              type="button"
              className="btn-enroll-course"
              onClick={handleCancel}
              disabled={loading}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
