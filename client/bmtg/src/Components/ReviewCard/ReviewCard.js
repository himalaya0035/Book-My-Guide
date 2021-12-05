import React from "react";

import "./ReviewCard.css";
import Rating from "../Rating/Rating";

function ReviewCard({imgUrl, fullName, rating, time, date, content}) {
  return (
    <div className="reviewCard">
      <div className="reviewCard__header">
        <div className="reviewCard__person">
          <img
            src={imgUrl}
            alt={fullName}
            className="reviewCard__personImg"
          />
          <div className="reviewCard__rating">
            <p>{fullName}</p>
            <Rating value={rating} color="#f78383" />
          </div>
        </div>
        <div className="reviewCard__timestamp">
          <p>{time} {date}</p>
        </div>
      </div>
      <div className="reviewCard__review">
        <p style={{ color: "#808080", fontSize: " 16px" }}>
          {content}
        </p>
      </div>
    </div>
  );
}

export default ReviewCard;
