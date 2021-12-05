import React from "react";
import BookingCard from "../../Components/BookingCard/BookingCard";

function CurrentBookings({bookings}) {
    return (
        <div className="currentBookings">
            {bookings.map(booking =>
                <BookingCard key={booking.id} data={booking} isCompleted={false}/>
            )}
        </div>
    );
}

export default CurrentBookings;
