import React from "react";

export default function Button({
  classes = "",
  text = "Click",
  type = "button",
  onClick,
  icon,
}) {
  const eventHandler = () => {
    console.warn("⚠️ Add event handler to the button!");
  };

  return (
    <button
      type={type}
      className={`btn ${classes}`}
      onClick={onClick || eventHandler}
    >
      <div className="d-flex">
        {icon}
        {text}
      </div>
    </button>
  );
}
