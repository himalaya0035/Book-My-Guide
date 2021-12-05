import React from "react";
import './TopBackgroundCard.css'
import BackButton from "../BackButton/BackButton";
import UtilityRightButton from "../UtilityRightButton/UtilityRightButton";

function TopBackgroundCard({name, imgUrl}) {
  return (
    <div className="tourListProfileImage">
      <img
        src={imgUrl}
        alt={name}
      />
      <BackButton/>
      <UtilityRightButton iconType="fa fa-heart"/>
      <div className="overlayBlack"></div>
      <h3
        style={{
          color: "white",
          position: "absolute",
          bottom: "20px",
          left: "15px",
          width: "300px",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
          {name}
      </h3>
    </div>
  );
}

export default TopBackgroundCard;
