import React from 'react'
import {useNavigate} from "react-router-dom";

function BackButton({positionType = 'absolute'}) {
    const navigate = useNavigate();
    const goToPreviousPage = () => {
      navigate(-1);
    };
    return (
        <div
        className="imageBackground flex flex-center"
        style={{
          position: positionType,
          top: "15px",
          left: "15px",
          zIndex: 10,
        }}
        onClick={goToPreviousPage}
      >
        <i
          className="fa fa-angle-left"
          style={{ color: "#f78383", fontSize: "20px" }}
        />
      </div>
    )
}

export default BackButton
