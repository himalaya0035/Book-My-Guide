import React from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../Components/PageHeader/PageHeader";
import "./PartnerDashboard.css";
import { getAccessToken, parseJwt } from "../../jwtparser";

function PartnerDashboard() {
  let userObject = parseJwt(getAccessToken());
  return (
    <div className="partnerDashboard">
      <PageHeader
        pageTitle={
          <p>
            Partner's <span style={{ color: "#f78383" }}>View</span>
          </p>
        }
      />
      <div
        className="partnerDashboard guideDashboard__details"
        style={{
          height: "150px",
        }}
      >
        <div className="guideDashboard__guide">
          <img
            src="https://lh3.googleusercontent.com/ogw/ADea4I6LLtwRYq6xegx50MNFvHXJ1PHRfuwTDxrq6edH=s83-c-mo"
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
          <div className="guideDashboard__about">
            <h2 style={{ marginTop: "0px", marginBottom: "5px" }}>
              Creative Thinking
            </h2>

            <p style={{ color: "gray" }}>9027138976</p>
          </div>
        </div>
      </div>

      {userObject.partner_is_verified ? (
        <div className="partnerDashboard__second">
          <div className="partnerDashboard__guideDashboard">
            <Link
              to={userObject.hasOwnProperty('tourguide_is_verified') ? (userObject.tourguide_is_verified ? '/designtour' : '') : "/tourguideregister"}
              style={{
                textDecoration: "none",
                color: "white",
                marginLeft: "14px",
              }}
              className={"flex flex-center"}
            >
              {userObject.hasOwnProperty('tourguide_is_verified') ? (userObject.tourguide_is_verified ? 'Design a Tour' : 'Guide Verification Pending') : "Be a Tour Guide" }
            </Link>
            <img
              src="https://st2.depositphotos.com/1874273/6290/v/950/depositphotos_62907815-stock-illustration-tourist-guide-logo.jpg"
              alt="tour-guide"
            />
          </div>
          <Link style={{
                textDecoration: "none",
                color: "white",
                marginLeft: "0px",
              }} to="/comingsoon" className="partnerDashboard__createPackage">
            <div>Create <br /> a Package</div>
            <img
              src="https://www.middleweb.com/wp-content/uploads/2017/06/tour-guide-teacher-feature.png"
              alt="site-seeing"
            />
          </Link>
        </div>
      ) : (
        <div
          className="flex flex-center"
          style={{
            flexDirection: "column",
            background: "white",
            margin: "20px",
            borderRadius: "15px",
            filter: "drop-shadow(0 0.2rem 0.25rem rgba(0, 0, 0, 0.4))",
            paddingTop: "90px",
            paddingBottom: "20px",
          }}
        >
          <i
            className="fa fa-exclamation-triangle"
            style={{ color: "#f78383", fontSize: "90px", marginBottom: "15px" }}
          />
          <div
            style={{
              marginLeft: "15px",
              marginRight: "15px",
            }}
          >
            <h3 style={{ marginBottom: "15px", textAlign: "center" }}>
              Your request for becoming a partner is pending.
            </h3>
            <p
              style={{
                marginTop: "60px",
                marginBottom: "15px",
                fontSize: "13px",
                color: "#808080",
              }}
            >
              Note : It usually takes 3-5 working days before a request gets
              verified. If its takes longer than a week then please re-apply.
            </p>
            <button
              style={{
                padding: "10px",
                width: "100%",
                border: "none",
                borderRadius: "15px",
                background: "#f78383",
                color: "white",
              }}
              onClick = {() => window.location.href = '/beapartner' }
            >
              Re-Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PartnerDashboard;
