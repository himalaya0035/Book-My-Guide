import React, {useEffect, useState} from "react";
import PageHeader from "../../Components/PageHeader/PageHeader";
import CompletedTours from "./CompletedTours";
import CurrentBookings from "./CurrentBookings";
import "./UserDashboard.css";
import axios from 'axios';
import {makeGetRequest} from "../../makeGetRequest";
import {getAccessToken, parseJwt} from "../../jwtparser";
import DJANGO_URL from "../../constants";


function UserDashboard() {
    const [btn1, setBtn1] = useState(true);
    const [btn2, setBtn2] = useState(false);
    const [completedBookings, setCompletedBookings] = useState([]);
    const [currentBookings, setCurrentBookings] = useState([]);
    const [loader, setLoader] = useState(false);
    const [userData, setUserData] = useState({
        full_name: ''
    });


    let today = new Date().toISOString().split("T")[0];
    let currentTime = new Date();
    let currentOffset = currentTime.getTimezoneOffset();
    let ISTOffset = 330;
    let ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset) * 60000);
    let currentISTTime = ISTTime.getHours() + ":" + ISTTime.getMinutes() + ":" + ISTTime.getSeconds();

    useEffect(() => {
        const source = axios.CancelToken.source();

        async function fetchBookings() {
            setLoader(true);
            try {
                const response = await makeGetRequest(DJANGO_URL + "/accounts/dashboard");
                setUserData(parseJwt(getAccessToken()))

                setLoader(false);
                const completedTours = () => {
                    setCompletedBookings(response.data.bookings.filter(booking => {
                        if (booking.date < today || (booking.date === today && booking.start_time < currentISTTime)) {
                            return 1;
                        } else return 0;
                    }))
                }

                const currentBookings = () => {
                    setCurrentBookings(response.data.bookings.filter(booking => {
                        if (booking.date > today || (booking.date === today && booking.start_time > currentISTTime)) {
                            return 1;
                        } else return 0;
                    }))
                }

                completedTours()
                currentBookings()


            } catch (error) {
                if (axios.isCancel(error)) {
                } else {
                    throw error;
                }
            }
        }

        fetchBookings();
        return () => {
            source.cancel();
        };
    }, [currentISTTime, today]);
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
                alt=""
            />) : (<div className="userDashboard">
                <PageHeader
                    pageTitle={
                        <>
                            {userData && userData.full_name.split(" ")[0]} <span
                            style={{color: "#f78383"}}>{userData && userData.full_name.split(" ")[1]}</span>
                        </>
                    }
                />
                <div className="userDashboard__main">
                    <div className="userDashboard__first" style={{marginLeft: "10px", marginRight: "10px"}}>
                        <img
                            src={userData.image}
                            alt={userData.full_name}
                        />
                        <div className="userDashboard__userDetails">
                            <h3>{userData.full_name}</h3>
                            {/*<p>{userData.email}</p>*/}
                            <button><i className="fa fa-edit"></i> Edit</button>
                        </div>
                    </div>
                    <div className="userDashboard__second">
                        <div className="userDashboard__tabButtons">
                            <button
                                className={
                                    "userDashboard__btn1" +
                                    (btn1
                                        ? " userDashboard__activeTab"
                                        : " userDashboard__unactiveTab")
                                }
                                onClick={() => {
                                    setBtn1(true);
                                    setBtn2(false);
                                }}
                            >
                                Current Bookings
                            </button>
                            <button
                                className={
                                    "userDashboard__btn2" +
                                    (btn2
                                        ? " userDashboard__activeTab"
                                        : " userDashboard__unactiveTab")
                                }
                                onClick={() => {
                                    setBtn2(true);
                                    setBtn1(false);
                                }}
                            >
                                Completed Tours
                            </button>
                        </div>

                        {btn1 && <CurrentBookings bookings={currentBookings}/>}
                        {btn2 && <CompletedTours bookings={completedBookings}/>}
                    </div>
                </div>
            </div>)}
        </div>
    );
}

export default UserDashboard;
