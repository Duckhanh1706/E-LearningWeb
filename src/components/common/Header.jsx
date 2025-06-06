import React from "react";
// Components
import Title from "./Title";
import Button from "./Button";
// Img's
import headerImg from "../../img/header-img.png";

export default function Header({
  children,
  login,
  startLearningEvent,
  handleScrollToOffer,
}) {
  return (
    <header className="header d-flex mt-4">
      <div className="header-content mt-4">
        <Title
          text="Learn to code by watching others"
          classes={"header-title fs-xxl"}
        />
        <p className="header-text mb-3">
          See how experienced developers solve problems in real-time. Watching
          scripted tutorials is great, but understanding how developers think is
          invaluable.
        </p>
        <div className="header-btn">
          <Button
            classes={"btn-primary text-light"}
            type={"button"}
            text={"Try it free 30 days"}
            onClick={
              !login
                ? startLearningEvent
                : () => window.alert("You are logged in.")
            }
          />
          <Button
            classes={"btn-secondary"}
            type={"button"}
            text={"Learn more..."}
            onClick={handleScrollToOffer}
          />
        </div>
        <img src={headerImg} alt="header-img" className="header-img" />
      </div>

      {children}
    </header>
  );
}
