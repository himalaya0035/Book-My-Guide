import React, {useEffect,useState} from "react";
import PageHeader from "../../Components/PageHeader/PageHeader";
import PlaceCard from "../../Components/PlaceCard/PlaceCard";
import axios from "axios";
import DJANGO_URL from "../../constants";

function FavouritesPage() {
    const [places, setPlaces] = useState([]);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
      const source = axios.CancelToken.source();
      async function fetchPlaces() {
        setLoader(true);
        try {
          const response = await axios.get(
            DJANGO_URL + '/guide/all-places?location__state=&location__city=' + 'Agra'
          );
  
          setLoader(false);
          setPlaces(response.data);
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
    }, []);
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
                  src="loaderHome.gif"
                  style={{ width: "100px", height: "100px" }}
                  alt = "loader"
                ></img>) : (<><div className="tourListPageWrapper">
            <PageHeader pageTitle={<> Your <span style={{color:"#f78383"}}>Favourites</span></>} />
            <div
              className="aboutPlace2"
              style={{
                marginTop: "65px",
                height: "auto",
                zIndex: "-10",
                position: "fixed",
              }}
            >
              
            </div>
          </div>
          <div
            className="tourLists"
            style={{ marginTop:"15px", flexWrap: "wrap", padding: "20px"  }}
          >
              {places.map((place) => <PlaceCard key={place.id} data={place}/>)}
          </div></>)}
        </div>
      );
}

export default FavouritesPage
