import React, {useEffect, useState} from "react";
import BackButton from "../../Components/BackButton/BackButton";

import "./BookGuidePage.css";
import CardTypeTwo from "../../Components/CardTypeTwo/CardTypeTwo";
import {useParams} from "react-router-dom";
import axios from "axios";
import {makePostRequest} from "../../makePostRequest";
import DJANGO_URL from "../../constants";

function BookGuidePage() {
    const [slide, setSlide] = useState(1);

    const [loader, setLoader] = useState(false);
    const [guideDetails, setGuideDetails] = useState();
    const [noOfPeople, setNoOfPeople] = useState(1);
    const [btnLoader, setBtnLoader] = useState(false);
    let x = new Date().toLocaleDateString();
    const [tourDate, setTourDate] = useState(
        x.slice(5, 10) + '-' +  x.slice(0, 2) + '-' + x.slice(3, 4)
    );
    const [tourCharges, setTourCharges] = useState(0)
    const [selectedSlot, setSelectedSlot] = useState();
    const [selectedSlotId, setSelectedSlotId] = useState();
    const [perPersonCharge, setPerPersonCharge] = useState(0);

    const [availableTimings, setAvailableTimings] = useState();
    const check = (e) => {
        let arr = document.getElementsByClassName("slot");
        for (let i = 0; i < arr.length; ++i) {
            arr[i].className = "slot";
        }
        e.target.className = "slot active";
        setSelectedSlot(e.target.innerText)
        setSelectedSlotId(e.target.id);
    };
    const {guideId} = useParams();
    useEffect(() => {
        const source = axios.CancelToken.source();

        async function fetchGuideDetails() {
            setLoader(true);
            try {
                const response = await axios.get(
                    DJANGO_URL + "/guide/" + guideId
                );
                const timingsResponse = await axios.get(
                    DJANGO_URL + "/booking/get-availability/" +
                    guideId +
                    "?date=" +
                    tourDate
                );
                console.log(timingsResponse.data)
                setAvailableTimings(timingsResponse.data);
                setLoader(false);
                setGuideDetails(response.data);
                setPerPersonCharge(response.data.fee);
                setTourCharges(response.data.fee)
            } catch (error) {
                if (axios.isCancel(error)) {
                } else {
                    throw error;
                }
            }
        }

        fetchGuideDetails()
        return () => {
            source.cancel();
        };
    }, [guideId]);

    async function handleDateChange(e) {
        setTourDate(e.target.value);

        const timingsResponse = await axios.get(
            DJANGO_URL + "/booking/get-availability/" +
            guideId +
            "?date=" +
            e.target.value
        );
        setAvailableTimings(timingsResponse.data);
    }

    async function handleSubmit() {
        const data = {
            guide: guideId,
            date: tourDate,
            timing: selectedSlotId,
            num_of_people: noOfPeople
        }
        setBtnLoader(true)
        await makePostRequest(DJANGO_URL + "/booking/create", data, "application/json")
        setBtnLoader(false)

        const tempData = {
            guideName: guideDetails.user.name,
            contactNumber: guideDetails.phone_number,
            date: tourDate,
            time: selectedSlot,
            peopleCount: noOfPeople,
            totalAmount: tourCharges * 0.1 + tourCharges
        }

        window.sessionStorage.setItem("recentBookingDetails", JSON.stringify(tempData))

        window.location.replace("/bookingSuccessful")
    }

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
                style={{width: "100px", height: "100px"}}
                alt="loader"
            />) : (<div className="bookGuidePageWrapper">
                <div
                    className="guideTopCard"
                    style={{
                        background:
                            "url('https://images.unsplash.com/photo-1548013146-72479768bada?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dGFqJTIwbWFoYWwlMjBhZ3JhJTIwaW5kaWF8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')",
                    }}
                >
                    <BackButton/>
                    <div className="guideInformation">
                        {guideDetails &&
                        <CardTypeTwo link={"/guide/" + guideDetails.id + "/reviews"} data={guideDetails}/>}
                        <div className="featuredReview flex flex-center">
                            <p
                                style={{
                                    textAlign: "center",
                                    fontStyle: "italic",
                                    fontSize: "16px",
                                }}
                            >
                                &ldquo; {guideDetails && guideDetails.featured_review} &rdquo;
                            </p>
                        </div>
                    </div>
                    <div className="bookingMultiStepForm">
                        {slide === 1 && (
                            <div className="tourDetails">
                                <h3 style={{marginBottom: "10px", color: "#f78383"}}>
                                    <i className="fa fa-info-circle"></i> Tour Description
                                </h3>
                                <p
                                    style={{
                                        fontSize: "16px",
                                        color: "#7e7e7e",
                                        marginBottom: "20px",
                                    }}
                                >
                                    {guideDetails && guideDetails.description}
                                </p>
                                <h3 style={{marginBottom: "10px", color: "#f78383"}}>
                                    <i className="fa fa-clock"></i> Time Required
                                </h3>
                                <p
                                    style={{
                                        fontSize: "16px",
                                        color: "#7e7e7e",
                                        marginBottom: "20px",
                                    }}
                                >
                                    {availableTimings && `The Complete Tour would take ${availableTimings[0].end.split(":")[0] - availableTimings[0].start.split(":")[0]} hours ${availableTimings[0].end.split(":")[1] - availableTimings[0].start.split(":")[1]} minutes`}
                                </p>
                            </div>
                        )}
                        {slide === 2 && (
                            <div className="formOne">
                                <h3 style={{marginBottom: "15px", color: "#f78383"}}>Date</h3>
                                <input
                                    id="bookingDate"
                                    type="date"
                                    value={tourDate}
                                    onChange={handleDateChange}
                                    placeholder="Pick a Date"
                                    min={new Date().toLocaleDateString()}
                                />
                                <h3 style={{marginBottom: "15px", color: "#f78383"}}>
                                    Slots
                                </h3>
                                <div className="listOfSlots">
                                    {availableTimings.map((timing) => (
                                        <div key={timing.id} id={timing.id} onClick={check} className="slot">
                                            {timing.start.slice(0, 5)}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {slide === 3 && (
                            <div className="confirmBooking">
                                <h3 style={{marginBottom: "10px", color: "#f78383"}}>
                                    Booking Details
                                </h3>
                                <hr/>
                                <h4
                                    style={{
                                        marginBottom: "10px",
                                        marginTop: "10px",
                                        color: "#f78383",
                                    }}
                                >
                                    <i className="fa fa-map-marker-alt"></i> Place
                                </h4>
                                <p style={{color: "gray", fontSize: "14px"}}>
                                    {guideDetails.place.place_name}, {guideDetails.place.location.city}
                                </p>
                                <h4
                                    style={{
                                        marginBottom: "10px",
                                        marginTop: "10px",
                                        color: "#f78383",
                                    }}
                                >
                                    <i className="fa fa-calendar"></i> Date & Time
                                </h4>
                                <p
                                    style={{
                                        color: "gray",
                                        fontSize: "14px",
                                        marginBottom: "15px",
                                    }}
                                >
                                    {selectedSlot} {tourDate}
                                </p>
                                <hr/>
                                <h4
                                    style={{
                                        marginBottom: "10px",
                                        marginTop: "10px",
                                        color: "#f78383",
                                    }}
                                >
                                    <i className="fa fa-clipboard"/> Charges
                                </h4>
                                <div className="flex flex-sb flex-alignCenter">
                                    <p
                                        style={{
                                            color: "gray",
                                            fontSize: "14px",
                                            marginBottom: "10px",
                                        }}
                                    >
                                        Tour Guide Charges
                                    </p>
                                    <p
                                        style={{
                                            color: "gray",
                                            fontSize: "14px",
                                            marginBottom: "10px",
                                        }}
                                    >
                                        <input
                                            type="number"
                                            id="noOfPeople"
                                            value={noOfPeople}
                                            onChange={(e) => {
                                                if (parseInt(e.target.value) <= 0) {
                                                    e.target.value = 1;
                                                }
                                                if (parseInt(e.target.value) > 10) {
                                                    e.target.value = 10;
                                                }
                                                setNoOfPeople(e.target.value)
                                                setTourCharges(e.target.value * perPersonCharge)
                                            }}
                                            min="1"
                                            max="10"
                                            style={{
                                                width: "30px",
                                                marginRight: "8px",
                                                textAlign: "center",
                                                border: "2px solid #f78383",
                                            }}
                                        />
                                        Rs {tourCharges}
                                    </p>
                                </div>
                                <div className="flex flex-sb flex-alignCenter">
                                    <p
                                        style={{
                                            color: "gray",
                                            fontSize: "14px",
                                            marginBottom: "10px",
                                        }}
                                    >
                                        CGST
                                    </p>
                                    <p
                                        style={{
                                            color: "gray",
                                            fontSize: "14px",
                                            marginBottom: "10px",
                                        }}
                                    >
                                        <span
                                            style={{marginRight: "8px"}}>5%</span> Rs {parseFloat(0.05 * tourCharges).toFixed(2)}
                                    </p>
                                </div>
                                <div className="flex flex-sb flex-alignCenter">
                                    <p
                                        style={{
                                            color: "gray",
                                            fontSize: "14px",
                                            marginBottom: "10px",
                                        }}
                                    >
                                        SGST
                                    </p>
                                    <p
                                        style={{
                                            color: "gray",
                                            fontSize: "14px",
                                            marginBottom: "10px",
                                        }}
                                    >
                                        <span
                                            style={{marginRight: "8px"}}>5%</span> Rs {parseFloat(0.05 * tourCharges).toFixed(2)}
                                    </p>
                                </div>
                                <div
                                    className="flex flex-sb flex-alignCenter"
                                    style={{marginTop: "40px"}}
                                >
                                    <p
                                        style={{
                                            color: "gray",
                                            fontSize: "16px",
                                            marginBottom: "10px",
                                        }}
                                    >
                                        Total Charges
                                    </p>
                                    <p
                                        style={{
                                            color: "gray",
                                            fontSize: "16px",
                                            marginBottom: "10px",
                                        }}
                                    >
                                        Rs {0.1 * tourCharges + tourCharges}
                                    </p>
                                </div>
                            </div>
                        )}
                        <div className="toggleBtns flex flex-center">
                            {slide !== 1 && (
                                <button
                                    className="changeFormBtn prev"
                                    onClick={() => setSlide((prevData) => prevData - 1)}
                                >
                                    Prev
                                </button>
                            )}
                            {slide !== 3 && (
                                <button
                                    className="changeFormBtn next"
                                    onClick={() => {
                                        if (slide === 2) {
                                            if (document.getElementsByClassName('active').length === 0) {
                                                return
                                            } else {

                                            }
                                        }
                                        setSlide((prevData) => prevData + 1)
                                    }}
                                >
                                    Next
                                </button>
                            )}
                            {slide === 3 && (
                                <button className="changeFormBtn next" onClick={handleSubmit}>
                                    {btnLoader ? 'Booking...' : 'Proceed To Pay'}
                                    {btnLoader && <i className="fa fa-spinner fa-pulse" style={{marginLeft: "8px"}}/>}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>)}
        </div>
    );
}

export default BookGuidePage;