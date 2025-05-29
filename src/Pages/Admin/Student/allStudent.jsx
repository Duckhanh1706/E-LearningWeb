import React, { useEffect, useState } from "react";
import student from "../../../db/student.json";
import { Link } from "react-router-dom";
import "./Student.css";

const AllStudentsPage = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    setList([student]);
  }, []);

  return (
    <div className="students-page">
      <h2 className="students-page__title">Danh sách tất cả sinh viên</h2>
      <div className="students-page__list">
        {list.map((student) => (
          <div key={student._id} className="student-card">
            <img
              className="student-card__avatar"
              src={student.avatarUrl}
              alt={`${student.name} avatar`}
            />
            <div className="student-card__info">
              <h3 className="student-card__name">{student.name}</h3>
              <p className="student-card__email">{student.email}</p>
              <div className="student-card__actions">
                <Link
                  className="student-card__link"
                  to={`/admin/student/${student._id}`}
                >
                  Xem chi tiết
                </Link>
                <Link
                  className="student-card__delete-link"
                  to={`/admin/student/delete-student/${student._id}`}
                >
                  Xóa sinh viên
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllStudentsPage;
