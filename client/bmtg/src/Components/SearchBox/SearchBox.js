import React from "react";
import './SearchBox.css'
import { Link } from "react-router-dom";

function SearchBox() {



  return (
    <div className="placeSearchBox">
      <h1 style={{ marginBottom: "25px", color: "#272727" }}>
        Where do <br />
        you want to go ?
      </h1>
      <Link to="/search" style={{ position: "relative",display:"block"}}>
        <input
          type="text"
          spellCheck="false"
          placeholder="Search for places..."
        />
        <div
          className="searchIcon flex flex-center"
          style={{
            position: "absolute",
            bottom: "15px",
            right: "15px",
            filter: "drop-shadow(0 0.2rem 0.25rem rgba(0, 0, 0, 0.4))",
            height: "30px",
            width: "30px",
            borderRadius: "50%",
            backgroundColor: "white",
          }}
        >
          <img src="searchIcon.svg" style={{ width: "20px" }} alt="" />
        </div>
      </Link>
    </div>
  );
}

export default SearchBox;
