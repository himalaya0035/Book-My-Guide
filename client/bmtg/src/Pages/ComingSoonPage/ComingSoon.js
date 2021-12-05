import React from "react";
import {useNavigate } from "react-router";
import "./ComingSoon.css";

function ComingSoon() {
  const Navigate = useNavigate()
  return (
    <>
      <div className="comingSoon">
        <h3
          style={{
            textAlign: "center",
            position: "fixed",
            top: "7rem",
            color: "white",
            zIndex: 10,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          Coming Soon
        </h3>
      </div>
      <div id="overlay"></div>
      <div onClick={() => Navigate(-1)} style={{position:"fixed",padding:"20px",bottom:"20%",width:"230px",left:"50%",transform:"translateX(-50%)"}} >
        <button className="bookingSuccessful__btn"><i className="fa fa-arrow-left" style={{marginRight:"5px"}}></i> Back</button>
      </div>
    </>
  );
}

export default ComingSoon;