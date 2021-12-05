import React, { useEffect, useState } from "react";
import CardTypeTwo from "../../Components/CardTypeTwo/CardTypeTwo";
import PageHeader from "../../Components/PageHeader/PageHeader";
import "./GuidesList.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import FilterModal from "../../Components/FilterModal/FilterModal";
import DJANGO_URL from "../../constants";

function GuidesList() {
  const [guides, setGuides] = useState([]);
  const [newGuides, setNewGuides] = useState([]);
  const [loader, setLoader] = useState(false);
  const { id } = useParams();
  const [openGuideFilter, setOpenGuideFilter] = useState(false);
  const handleOpenGuideFilter = () => {
    setNewGuides(guides);
    setOpenGuideFilter(true);
  };

  const handleCloseGuideFilter = () => setOpenGuideFilter(false);
  useEffect(() => {
    const source = axios.CancelToken.source();
    async function fetchGuides() {
      setLoader(true);
      try {
        const response = await axios.get(
          DJANGO_URL + "/guide/all-guides?place=" + id
        );
        setLoader(false);
        setGuides(() => response.data);
        setNewGuides(() => response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
        } else {
          throw error;
        }
      }
    }
    fetchGuides();
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
      {loader ? (
        <img
    src="/loaderHome.gif"
    style={{width: "100px", height: "100px"}}
    />
      ) : (
        <div className="guidePageWrapper">
          <PageHeader
            pageTitle={
              <>
                Available <span style={{ color: "#f78383" }}>Guides</span>
              </>
            }
            rightIcon="fa fa-filter"
            type="guideFilter"
            onClickFn={handleOpenGuideFilter}
          />

          {openGuideFilter && (
            <FilterModal
              open={openGuideFilter}
              handleClose={handleCloseGuideFilter}
              guides={guides}
              setGuides={setNewGuides}
            />
          )}
          <div className="tourGuidesList" style={{ marginTop: "50px" }}>
            {newGuides === undefined || newGuides?.length === 0 ? (
              <>
                <p className="tourGuideList__notAvailable">
                  <span style={{ color: "#f78383" }}>No</span> Guides available!
                </p>
                <img
                  src="/walkingPerson.gif"
                  className="tourGuide__notAvailable__gif"
                />
              </>
            ) : (
              <>
                {newGuides?.map((guide) => (
                  <CardTypeTwo
                    key={guide.id}
                    link={guide.id + "/book"}
                    data={guide}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default GuidesList;