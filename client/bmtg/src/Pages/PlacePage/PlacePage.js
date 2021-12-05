import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Button from "../../Components/Button/Button";
import IconWithText from "../../Components/IconWithText/IconWithText";
import TopBackgroundCard from "../../Components/TopBackgroundCard/TopBackgroundCard";
import "./PlacePage.css";
import axios from "axios";
import DJANGO_URL from "../../constants";

function PlacePage() {
  const {id} = useParams()

  const [place, setPlace] = useState({
    open_time: '08:30:00',
    close_time: '08:30:00'
  });
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    const source = axios.CancelToken.source();
    async function fetchPlace() {
      setLoader(true);
      try {
        const response = await axios.get(
          DJANGO_URL + "/guide/place/" + id
        );
        setLoader(false);
        setPlace(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
        } else {
          throw error;
        }
      }
    }
    fetchPlace();
    return () => {
      source.cancel();
    };
  }, [id]);
  return (
    <div
    style={
      loader
        ? {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }
        : {}
    }
    >
      {loader ? (<img
              src="/loaderHome.gif"
              style={{ width: "100px", height: "100px" }}
              alt="loader"
            ></img>) : (<div className="placePageWrapper" style={{ padding: "15px" }}>
        <TopBackgroundCard name={place.place_name} imgUrl={place.image} />
        <div style={{ padding: "0px 10px 0px 10px" }}>
          <h2 style={{ marginBottom: "15px", color: "#f78383" }}>Overview</h2>
          <div
            className="openingAndClosingTime flex"
            style={{ marginBottom: "20px" }}
          >
            <IconWithText
              iconType="fa fa-clock"
              headingText="Duration"
              valueText={place.open_time.slice(0,5)  + "-" +  place.close_time.slice(0,5) }
              marginRight={25}
            />
            <IconWithText
              iconType="fa fa-star"
              headingText="Rating"
              valueText={place.rating + " out of 5"}
            />
          </div>
        </div>
        <div className="aboutPlace">
          <div className="fadeWrapper">
            <p>{place.description}</p>
          </div>
        </div>
        <Link to="guides">
          <Button text="Book Guides" icon="fa fa-arrow-right" />
        </Link>
      </div>)}
    </div>
  );
}

export default PlacePage;