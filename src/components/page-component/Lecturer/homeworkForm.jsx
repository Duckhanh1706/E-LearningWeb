import React from "react";

const FileUpload = ({ onFileChange, onUpload }) => {
  return (
    <div>
      <input type="file" onChange={onFileChange} />
      <button onClick={onUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
