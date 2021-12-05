import React from "react";
import {Link} from 'react-router-dom'
import './PlaceCard.css'

function PlaceCard({data}) {
  return (
  
    <Link to={"/place/" + data.id} style={{textDecoration:"none",color:"black"}} className="tourList">
      <img
        src={data.image}
        alt={data.place_name}
      />
      <div className="flex flex-sb flex-alignCenter">
        <h5 style={{ marginLeft: "5px", marginTop: "5px",width:"100px" }}>{data.place_name}</h5>
        <div
          className="flex flex-center"
          style={{
            bottom: "15px",
            right: "15px",
            filter: "drop-shadow(0 0.2rem 0.25rem rgba(0, 0, 0, 0.4))",
            height: "30px",
            width: "30px",
            borderRadius: "50%",
            backgroundColor: "white",
          }}
        >
          <i className="fa fa-heart" style={{ color: "#f78383" }} />
        </div>
      </div>
    </Link>
  
  );
}

export default PlaceCard;
