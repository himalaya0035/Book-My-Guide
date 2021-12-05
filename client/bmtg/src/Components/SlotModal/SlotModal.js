import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "./SlotModal.css";
import SlotModalPerson from "../SlotModalPerson/SlotModalPerson";
import DJANGO_URL from "../../constants";
import {makeGetRequest} from "../../makeGetRequest";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 1,
    borderRadius: "15px",
};

function SlotModal({open, handleClose, timingId, startTime, date}) {
    const [bookingsData, setBookingsData] = useState([]);
    // let x = new Date().toLocaleDateString();

    const getTimingsDateAppointmentsURL = (time_id) => {
        return DJANGO_URL + `/booking/get-appointmentss?timing=${time_id}&date=${date}`
    }

    useEffect(() => {
        async function fetchSlots(){
            const res = await makeGetRequest(getTimingsDateAppointmentsURL(timingId))
            setBookingsData(res.data)
        }
        fetchSlots()
    }, [timingId])

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="slotModal__main">
                        <div className="slotModal__closeBtn" onClick={handleClose}>
                            <i className="fa fa-times"/>
                        </div>
                        <div className="slotModal__details">
                            <h3>
                                <span>Total Bookings </span>
                                <span>{bookingsData.length}</span>
                            </h3>
                            <h3>
                                <span>Date</span>
                                <span>{date}</span>
                            </h3>
                            <h3>
                                <span>Time</span>
                                <span>{startTime}</span>
                            </h3>
                        </div>

                        <div className="slotModal__list">
                            {bookingsData.map(booking =>
                                <SlotModalPerson key={booking.id} name={booking.user.full_name}
                                                 imgUrl={booking.user.prof_img} contact={booking.user.email}
                                                 people={booking.num_of_people} price={booking.price}/>)}
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default SlotModal;