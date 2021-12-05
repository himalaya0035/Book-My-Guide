import React from "react";
import BookingCard from "../../Components/BookingCard/BookingCard";

function CompletedTours({bookings}) {
    return (
        <div className="completedTours">

            {bookings.map(booking =>
                <BookingCard key={booking.id} data={booking} isCompleted={true}/>
            )}    </div>
    );
}

export default CompletedTours;
