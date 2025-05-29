import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import lecturers from "../../../../db/lecturer.json";

const RejectInstructor = () => {
  const { instructorId } = useParams();
  const navigate = useNavigate();

  const instructor = lecturers.find((inst) => inst.id === Number(instructorId));

  if (!instructor) {
    return <div>Giảng viên không tồn tại!</div>;
  }

  const handleReject = () => {
    setTimeout(() => {
      alert(`❌ Từ chối giảng viên ${instructor.name} thành công!`);
      navigate("/admin/instructor");
    }, 500);
  };

  return (
    <div>
      <h2>Từ chối giảng viên: {instructor.name}</h2>
      <p>Email: {instructor.email}</p>
      <p>Mô tả: {instructor.description}</p>
      <button onClick={handleReject}>Xác nhận từ chối</button>
    </div>
  );
};

export default RejectInstructor;
