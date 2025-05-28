import React, { useEffect, useState } from "react";
import courseData from "../../../db/course.json";
import "./enrollCourse.css";
import { useNavigate } from "react-router-dom";

export default function EnrollCourse() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(""); // "price" hoặc "title"
  const [orderBy, setOrderBy] = useState(""); // "asc" hoặc "desc"
  const [minCost, setMinCost] = useState("");
  const [maxCost, setMaxCost] = useState("");

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setCourses(courseData);
    setFilteredCourses(courseData);
  }, []);

  useEffect(() => {
    let temp = [...courses];

    // Tìm kiếm theo tiêu đề
    if (searchTerm.trim()) {
      temp = temp.filter((c) =>
        c.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Lọc theo khoảng giá
    if (minCost !== "") {
      const min = parseFloat(minCost);
      if (!isNaN(min)) temp = temp.filter((c) => c.price >= min);
    }
    if (maxCost !== "") {
      const max = parseFloat(maxCost);
      if (!isNaN(max)) temp = temp.filter((c) => c.price <= max);
    }

    // Sắp xếp theo tiêu chí
    if (sortBy === "price") {
      if (orderBy === "asc") {
        temp.sort((a, b) => a.price - b.price);
      } else if (orderBy === "desc") {
        temp.sort((a, b) => b.price - a.price);
      }
    } else if (sortBy === "title") {
      if (orderBy === "asc") {
        temp.sort((a, b) => a.title.localeCompare(b.title));
      } else if (orderBy === "desc") {
        temp.sort((a, b) => b.title.localeCompare(a.title));
      }
    }

    setFilteredCourses(temp);
  }, [searchTerm, sortBy, orderBy, minCost, maxCost, courses]);

  const openModal = (course) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCourse(null);
  };

  const handleRegister = () => {
    alert("Đăng ký khóa học thành công!");
    setShowModal(false);
    navigate("/student/cart");
  };

  return (
    <div className="enroll-wrapper">
      <h2 className="enroll-title">📘 Danh sách khóa học</h2>

      {/* Thanh tìm kiếm và lọc */}
      <div className="filter-search-container">
        <input
          type="text"
          placeholder="Tìm kiếm khóa học..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="">Sắp xếp theo</option>
          <option value="price">Giá</option>
          <option value="title">Tiêu đề</option>
        </select>

        <select
          value={orderBy}
          onChange={(e) => setOrderBy(e.target.value)}
          className="order-select"
        >
          <option value="">Thứ tự</option>
          <option value="asc">Tăng dần</option>
          <option value="desc">Giảm dần</option>
        </select>
        {sortBy === "price" && (
          <>
            <input
              type="number"
              placeholder="Giá thấp nhất"
              min="0"
              value={minCost}
              onChange={(e) => setMinCost(e.target.value)}
              className="min-cost-input"
            />
            <input
              type="number"
              placeholder="Giá cao nhất"
              min="0"
              value={maxCost}
              onChange={(e) => setMaxCost(e.target.value)}
              className="max-cost-input"
            />
          </>
        )}
      </div>

      {/* Danh sách khóa học */}
      <ul className="grid-list">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <li key={course.id} className="enroll-item">
              <span className="enroll-link" onClick={() => openModal(course)}>
                {course.title}
              </span>
              <p className="enroll-price">
                💰 {course.price.toLocaleString()} VNĐ
              </p>
            </li>
          ))
        ) : (
          <p>Không tìm thấy khóa học phù hợp.</p>
        )}
      </ul>

      {/* Modal */}
      {showModal && selectedCourse && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Đăng ký khóa học: {selectedCourse.title}</h3>
            <p>
              <strong>Giá:</strong> {selectedCourse.price.toLocaleString()} VNĐ
            </p>
            <p>
              <strong>Giảng viên:</strong>{" "}
              {selectedCourse.instructor?.name || "N/A"}
            </p>
            <p>
              <strong>Mô tả:</strong> {selectedCourse.description}
            </p>
            <p>
              <strong>Số học sinh đã đăng ký:</strong>{" "}
              {selectedCourse.student?.length || 0}
            </p>
            <button onClick={closeModal} className="modal-close-btn">
              Đóng
            </button>
            <button onClick={handleRegister} className="modal-register-btn">
              Đăng ký ngay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
