import React, { useEffect, useRef } from "react";
import BackButton from "../BackButton/BackButton";
import UtilityRightButton from "../UtilityRightButton/UtilityRightButton";

function PageHeader({ pageTitle, rightIcon, type, onClickFn }) {
  const myref = useRef();

  useEffect(() => {
    function showHeader() {
      if (myref && myref.current) {
        myref.current.classList.toggle("active", window.scrollY > 0);
      }
    }
    window.addEventListener("scroll", showHeader);

    return () => {
      window.removeEventListener("scroll", showHeader); // cleanup function very important
    };
  }, [myref]);

  return (
    <div>
      <div ref={myref} className="pageHeader"></div>
      <BackButton positionType="fixed" />
      {rightIcon && (
        <UtilityRightButton
          iconType={rightIcon}
          positionType="fixed"
          type={type}
          onClickFn={onClickFn}
        />
      )}
      <h3
        style={{
          fontSize: "20px",
          position: "fixed",
          top: "25px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: "100",
          textAlign:"center",
          width:"290px"
        }}
      >
        {pageTitle}
      </h3>
    </div>
  );
}

export default PageHeader;
