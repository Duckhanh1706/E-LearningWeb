import { useState, useEffect } from "react";
import { useAuth } from "../../../components/context/AuthContext";
import "./profile.css";

export default function Profile() {
  const { user } = useAuth(); // Lấy thông tin user từ context
  const [studentInfo, setStudentInfo] = useState(null); // Trạng thái lưu thông tin học viên

  useEffect(() => {
    // Lấy thông tin học viên từ API (hoặc từ backend) sau khi trang được tải
    const fetchStudentProfile = async () => {
      try {
        const response = await fetch(`/api/student/profile/${user.email}`);
        if (!response.ok) {
          throw new Error("Failed to fetch student profile");
        }
        const data = await response.json();
        setStudentInfo(data.updatedData); // Lưu thông tin học viên vào state
      } catch (error) {
        console.error("Failed to fetch student profile:", error);
      }
    };

    if (user) {
      fetchStudentProfile();
    }
  }, [user]);

  if (!studentInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>{studentInfo.name}'s Profile</h1>
      </div>

      <div className="profile-body">
        <div className="profile-info">
          <div className="profile-item">
            <label>Email:</label>
            <span>{studentInfo.email}</span>
          </div>
          <div className="profile-item">
            <label>Phone Number:</label>
            <span>{studentInfo.phoneNumber}</span>
          </div>
          <div className="profile-item">
            <label>Avatar:</label>
            <div className="profile-avatar">
              <img src={studentInfo.avatarUrl} alt="Avatar" />
            </div>
          </div>
        </div>

        <div className="profile-actions">
          <button>Edit Profile</button>
        </div>
      </div>
    </div>
  );
}
