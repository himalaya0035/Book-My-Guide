import React, { useEffect, useState } from "react";
import "./HomePage.css";
import AppHeader from "../../Components/AppHeader/AppHeader";
import PlaceCard from "../../Components/PlaceCard/PlaceCard";
import SearchBox from "../../Components/SearchBox/SearchBox";
import Services from "../../Components/Services/Services";
import { Link } from "react-router-dom";
import axios from "axios";
import DJANGO_URL from "../../constants";


function HomePage() {
  const [places, setPlaces] = useState([]);
  const [loader, setLoader] = useState(false);
  const currCityName = window.localStorage.getItem("currentCity");

  useEffect(() => {
    const source = axios.CancelToken.source();

    async function fetchPlaces() {
      setLoader(true);
      try {
        const response = await axios.get(
          DJANGO_URL +
            "/guide/all-places?city_name=" +
            currCityName
        );

        setLoader(false);
        setPlaces(response.data.places);

      } catch (error) {
        if (axios.isCancel(error)) {
        } else {
          throw error;
        }
      }
    }

    fetchPlaces();
    return () => {
      source.cancel();
    };
  }, [currCityName]);

  return (
    <div
      className="homePageWrapper"
      style={{ padding: "30px", paddingTop: "35px" }}
    >
      <AppHeader />
      <SearchBox />
      <Services />
      <div className="tourListDisplay" style={{ marginBottom: "80px" }}>
        <div
          className="flex flex-sb flex-alignCenter"
          style={{ marginBottom: "20px" }}
        >
          <h3 style={{ color: "#3e3e3e" }}>
            Explore in <span style={{ color: "#f78383" }}>{currCityName}</span>{" "}
            <span></span>
          </h3>
          <Link
            to="/tourlist"
            style={{ textDecoration: "none", color: "gray" }}
          >
            <p>
              More
              <span>
                <i
                  className="fa fa-angle-right"
                  style={{ color: "#f33030", fontSize: "10px" }}
                />
              </span>
            </p>
          </Link>
        </div>
        <div
          className="tourLists"
          style={
            loader
              ? {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "25vh",
                }
              : {}
          }
        >
          {loader ? (
            <img
              src="loaderHome.gif"
              style={{ width: "80px", height: "80px" }}
              alt="loader"
            ></img>
          ) : places.length === 0 ? (
            <div
              className="flex flex-center"
              style={{ height: "160px", textAlign: "center" }}
            >

              <img src="sorryIcon.svg" alt="loader" style={{width:"100px",height:"100px",marginRight:"5px"}} /> Sorry, we aren't operating in {currCityName}
            </div>
          ) : (
            places && places
              .slice(0, 2)
              .map((place) => <PlaceCard key={place.id} data={place} />)
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
