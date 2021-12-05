import React from "react";

import "./BookingCard.css";
import BookingModal from "./BookingModal";
import DJANGO_URL from "../../constants";

function BookingCard({isCompleted, data}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div className="bookingCard">
            <img
                src={DJANGO_URL + data.package.image}
                alt={data.package.title}
            />

            {open && (
                <BookingModal
                    bookingId={data.id}
                    handleClose={handleClose}
                    open={open}
                    isCompleted={isCompleted}
                />
            )}

            <div className="bookingCard__details">
                <h3>{data.package.title}</h3>
                <p>{data.start_time.slice(0, 5)} {data.date}</p>
                <button onClick={handleOpen}>
                    View {isCompleted ? "Details" : "Booking"}
                </button>
            </div>
        </div>
    );
}

export default BookingCard;
