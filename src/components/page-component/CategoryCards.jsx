import React from "react";
import Button from "../common/Button";
export default function CategoryCards({
  title,
  text,
  children,
  icon_1,
  icon_2,
  icon_3,
  btnIcon,
  startLearnEvent,
  cardFooter = true,
  cardHeader = true,
  style,
}) {
  return (
    <div className="card" style={{ maxWidth: 400 }}>
      {cardHeader && (
        <div className="card-header">
          {icon_1}
          {icon_2}
          {icon_3}
        </div>
      )}

      <div className="card-body">
        <h3 className="card-title">{title ? title : "Card title"}</h3>
        <p className="card-text">
          {text}
          {children}
        </p>
      </div>
      {cardFooter && (
        <div className="card-footer">
          <Button
            classes={"btn-secondary"}
            text={"Start learning"}
            icon={btnIcon}
            onClick={startLearnEvent}
          />
        </div>
      )}
    </div>
  );
}
