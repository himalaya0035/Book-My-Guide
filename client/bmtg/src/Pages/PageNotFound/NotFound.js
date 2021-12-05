import React from "react";
import "./NotFound.css";

function NotFound() {
  return (
    <>
      <div className="notFound">
        <h3
          style={{
            textAlign: "center",
            position: "fixed",
            top: "5rem",
            color: "white",
            zIndex: 10,
            left: "53%",
            transform: "translateX(-50%)",
          }}
        >
          404 <br /> Not Found
        </h3>
      </div>
      <div id="overlay-404"></div>
      <div onClick={() => window.location.replace('/app')} style={{position:"fixed",padding:"20px",bottom:"20%",width:"270px",left:"50%",transform:"translateX(-50%)"}} >
        <button className="bookingSuccessful__btn"><i className="fa fa-arrow-left" style={{marginRight:"5px"}}></i> Back to HomePage </button>
      </div>
    </>
  );
}

export default NotFound;