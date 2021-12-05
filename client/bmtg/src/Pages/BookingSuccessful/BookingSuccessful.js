import React from "react";
import "./BookingSuccessful.css";
/*
guide name
date time
number of ppl
total amount
 */
function BookingSuccessful() {

    const data = JSON.parse(window.sessionStorage.getItem("recentBookingDetails"))

  return (
    <div className="bookingSuccessful">
      <div className="bookingSuccessful__main">
        <img src="ezgif.com-gif-maker(3).gif" alt="green-tick" />
        <h3>Booking Successfully done!</h3>
      </div>
      <div className="bookingSuccessful__details">
        <p>
          <span>Guide Name</span> <span>{data.guideName}</span>
        </p>

        <p>
          <span>Time & Date</span> <span>{data.time}, {data.date}</span>
        </p>
        <p>
          <span>Contact Guide</span> <span>{data.contactNumber}</span>
        </p>

        <p>
          <span>Money Paid</span> <span>₹ {data.totalAmount}</span>
        </p>

        <p>
          <span>No. of people</span> <span>x{data.peopleCount}</span>
        </p>
      </div>
      <div onClick={() => window.location.replace('/profile')} >
        <button className="bookingSuccessful__btn">View your Booking</button>
      </div>
    </div>
  );
}

export default BookingSuccessful;
