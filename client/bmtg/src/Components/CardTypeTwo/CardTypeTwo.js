import React from "react";
import {Link} from "react-router-dom";
import "./CardTypeTwo";

function CardTypeTwo({link,isReview,data}) {
    return (
        <Link to={!isReview ? link : ''} style={{textDecoration: "none", color: "black"}}>
            <div className="flex" style={{
                borderRadius: "15px",
                padding: "10px",
                background: "white",
                boxShadow: "3px 3px 20px rgba(0, 0, 0, 0.2)",
                marginBottom: "12px"
            }}>
                <img
                    src={data.user.image}
                    alt=""
                    style={{
                        height: "100px",
                        marginRight: "12px",
                        width: "100px",
                        objectFit: "cover",
                        objectPosition: "center top",
                        borderRadius: "15px",
                        filter: "drop-shadow(0 0.2rem 0.25rem rgba(0, 0, 0, 0.4))",
                    }}
                />
                <div style={{width: "65%"}}>
                    <div className="flex flex-alignCenter flex-sb">
                        <h3>{data.user.name}</h3>
                        {!isReview && (
              <i
                className="fa fa-angle-right"
                style={{ color: "#f78383", fontSize: "20px" }}
              ></i>
            )}
           
                    </div>
                    <p style={{color: "gray", fontSize: "14px", marginTop: "4px"}}><i
                        className="fa fa-map-marker-alt"></i> {data.place.place_name}, {data.place.location.city}</p>
                    <div className="flex flex-sb" style={{marginTop: "5px", alignItems: "flex-end"}}>
                        <div>
                            <p style={{color: "gray", fontSize: "14px"}}>Starting from </p>
                            <p style={{
                                color: "",
                                fontWeight: "bold",
                                fontSize: "20px",
                                marginTop: "4px"
                            }}>Rs {data.fee}</p>
                        </div>
                        <p style={{
                            fontSize: "20px",
                            color: "#f78383",
                            marginBottom: "2px",
                            marginRight: "5px"
                        }}>{data.rating} <i className="fa fa-star" style={{color: "#f78383"}}></i></p>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default CardTypeTwo;
