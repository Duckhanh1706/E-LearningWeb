import React, { useEffect, useState } from "react";
import instructors from "../../../db/lecturer.json";
import { Link } from "react-router-dom";
import "./Lecturer.css";

const AllInstructorsPage = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const approved = instructors.filter((i) => i.pendingStatus === "approved");
    setList(approved);
  }, []);

  return (
    <div className="instructors-page">
      <h2 className="instructors-page__title">Danh sách tất cả giảng viên</h2>
      <div className="instructors-page__list">
        {list.map((inst) => (
          <div key={inst.id} className="instructor-card">
            <img
              className="instructor-card__avatar"
              src={inst.avatarUrl}
              alt={`${inst.name} avatar`}
            />
            <div className="instructor-card__info">
              <h3 className="instructor-card__name">{inst.name}</h3>
              <p className="instructor-card__email">{inst.email}</p>
              <Link
                className="instructor-card__link"
                to={`/admin/instructor/${inst.id}`}
              >
                Xem chi tiết
              </Link>

              {/* Nút xóa giảng viên */}
              <Link
                className="instructor-card__delete-link"
                to={`/admin/instructor/delete-instructor/${inst.id}`}
                style={{ color: "red", marginLeft: "10px" }}
              >
                Xóa giảng viên
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllInstructorsPage;
