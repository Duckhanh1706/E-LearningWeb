// PendingList.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import lecturers from "../../../../db/lecturer.json";
import "../Lecturer.css"; // đường dẫn tới file json

const PendingList = () => {
  const [pendingInstructors, setPendingInstructors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const pending = lecturers.filter(
      (inst) => inst.pendingStatus === "pending"
    );
    setPendingInstructors(pending);
  }, []);

  return (
    <div className="pending-page">
      <h2>📋 Danh sách giảng viên chờ phê duyệt</h2>
      {pendingInstructors.length === 0 ? (
        <p>🎉 Không có giảng viên nào đang chờ duyệt.</p>
      ) : (
        pendingInstructors.map((inst) => (
          <div key={inst.id} className="instructor-card">
            <img
              src={inst.avatarUrl}
              alt={inst.name}
              className="instructor-avatar"
            />
            <div className="instructor-info">
              <h3>{inst.name}</h3>
              <p>{inst.email}</p>
              <p>{inst.description}</p>
            </div>
            <div className="instructor-actions">
              <button onClick={() => navigate(`./${inst.id}/approve`)}>
                ✅ Duyệt
              </button>
              <button onClick={() => navigate(`./${inst.id}/reject`)}>
                ❌ Từ chối
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PendingList;
