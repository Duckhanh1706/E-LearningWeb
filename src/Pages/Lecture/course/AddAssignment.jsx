// src/components/AddAssignment.jsx
import React, { useState } from "react";

const AddAssignment = () => {
  const [assignment, setAssignment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic để thêm bài tập
    console.log("Assignment added:", assignment);
  };

  return (
    <div>
      <h2>Thêm Bài Tập</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="assignment">Tên bài tập:</label>
        <input
          type="text"
          id="assignment"
          value={assignment}
          onChange={(e) => setAssignment(e.target.value)}
        />
        <button type="submit">Thêm</button>
      </form>
    </div>
  );
};

export default AddAssignment;
