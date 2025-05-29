import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import lecturers from "../../../../db/lecturer.json";
import "../Lecturer.css"; // import css file chung

const ApproveInstructor = () => {
  const { instructorId } = useParams();
  const navigate = useNavigate();

  const instructor = lecturers.find((inst) => inst.id === Number(instructorId));

  if (!instructor) {
    return <div>Giảng viên không tồn tại!</div>;
  }

  const handleApprove = () => {
    setTimeout(() => {
      alert(`✅ Duyệt giảng viên ${instructor.name} thành công!`);
      navigate("/admin/instructor");
    }, 500);
  };

  return (
    <div className="approve-instructor-container">
      <h2 className="approve-instructor-title">
        Duyệt giảng viên: {instructor.name}
      </h2>
      <p className="approve-instructor-info">Email: {instructor.email}</p>
      <p className="approve-instructor-info">Mô tả: {instructor.description}</p>
      <button className="approve-instructor-button" onClick={handleApprove}>
        Xác nhận duyệt
      </button>
    </div>
  );
};

export default ApproveInstructor;
