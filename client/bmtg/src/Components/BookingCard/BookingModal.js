import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Rating from "../Rating/Rating";
import {makeGetRequest} from "../../makeGetRequest";
import DJANGO_URL from "../../constants";
import {Link} from 'react-router-dom'
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 370,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 1,
    borderRadius: "20px",
};

function BookingModal({open, handleClose, isCompleted, bookingId}) {

    const [data, setData] = useState();

    useEffect(() => {
        async function fetchBooking(){
            const res = await makeGetRequest(DJANGO_URL + "/booking/" + bookingId)
            setData(res.data)
        }
        fetchBooking()
    }, [bookingId])

    return (
        <div>

            {data && (

                <div>
                    <Modal
                        open={open}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <div className="bookingModal__main">
                                <div className="bookingModal__guideDetails">
                                    <img
                                        src={data.guide.user.image}
                                        alt={data.guide.user.name}
                                    />
                                    <h3>{data.guide.user.name}</h3>
                                    <Rating value={data.guide.rating} color="white"/>
                                    <p>{data.guide.phone_number}</p>
                                </div>

                                <div className="bookingModal__booking">
                                    <div className="bookingModal__details">
                                        <h3>Place Name</h3>
                                        <p>{data.guide.place.place_name}, {data.guide.place.location.city}</p>
                                    </div>
                                    <div className="bookingModal__details">
                                        <h3>Date and Time</h3>
                                        <p>{data.start_time.slice(0, 5)} | {String(new Date(data.date).getDate()) + " " + String(new Date(data.date).toLocaleString('default', {month: 'short'}))}</p>
                                    </div>
                                    <div className="bookingModal__details">
                                        <h3>No. of People</h3>
                                        <p>{data.num_of_people}</p>
                                    </div>
                                    <div className="bookingModal__details">
                                        <h3>Money Paid (₹)</h3>
                                        <p>{data.price}</p>
                                    </div>
                                </div>
                                <div className="bookingModal__buttons">
                                    <button
                                        className="bookingModal__closeBtn"
                                        onClick={handleClose}
                                    >
                                        Close
                                    </button>
                                   {!isCompleted ? (
                <button className="bookingModal__cancelBtn">Cancel</button>
              ) : (
                <button className="bookingModal__reviewBtn">
                  <Link
                    to={"/guide/" + data.guide.id + "/review"}
                    style={{ color: "#fff", textDecoration: "none" }}
                  >
                    Review
                  </Link>
                </button>
              )}
                                </div>
                            </div>
                        </Box>
                    </Modal>
                </div>

            )}
        </div>
    );
}

export default BookingModal;
