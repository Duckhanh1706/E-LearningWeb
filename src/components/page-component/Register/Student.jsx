import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Info.css"; // Dùng chung file CSS

export default function RegisterStudentInfo() {
  const [name, setName] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !avatarFile || !phone.trim() || !email.trim()) {
      alert("Please fill in all fields!");
      return;
    }

    const studentInfo = {
      name,
      phone,
      email,
    };
    console.log("Student info submitted:", studentInfo);
    console.log("Avatar file:", avatarFile);
    alert("Student information submitted successfully!");

    navigate("/login");
  };

  return (
    <div className="pro-container">
      <h2 className="pro-h2">Student Information Registration</h2>

      <form onSubmit={handleSubmit} className="pro-form">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="pro-input"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="pro-input"
        />
        {avatarPreview && (
          <img
            src={avatarPreview}
            alt="Avatar Preview"
            className="pro-avatar-preview"
          />
        )}
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="pro-input"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="pro-input"
        />

        <button type="submit" className="pro-btn-submit">
          Submit Student Info
        </button>
      </form>
    </div>
  );
}
