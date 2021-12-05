import React, { useState } from "react";
import "./DesignTour.css";
import PageHeader from "../../Components/PageHeader/PageHeader";
import { makePostRequest } from "../../makePostRequest";
import DJANGO_URL from "../../constants";

let slots = [];

function DesignTour() {
  function getFullDayName(shortDayName) {
    const week = {
      Mon: "Monday",
      Tue: "Tuesday",
      Wed: "Wednesday",
      Thu: "Thursday",
      Fri: "Friday",
      Sat: "Saturday",
      Sun: "Sunday",
    };
    return week[shortDayName];
  }

  const [monday, setMonday] = useState(false);
  const [tuesday, setTuesday] = useState(false);
  const [wednesday, setWednesday] = useState(false);
  const [thursday, setThursday] = useState(false);
  const [friday, setFriday] = useState(false);
  const [saturday, setSaturday] = useState(false);
  const [sunday, setSunday] = useState(false);
  const [slotErr, setSlotErr] = useState("");
  const [timePerTour, setTimePerTour] = useState("");
  const [tourName, setTourName] = useState("");
  const [tourDesc, setTourDesc] = useState("");
  const [time, setTime] = useState("");
  const [tourPerson, setTourPerson] = useState("");
  const [tourPrice, setTourPrice] = useState(0);
  const [btnLoader, setBtnLoader] = useState(false);

  let endTimings = [];
  let slotTimings = [];

  const addSlot = (e) => {
    e.preventDefault();

    let div = document.createElement("div");
    div.style.backgroundColor = "skyblue";
    div.style.borderRadius = "20px";
    div.style.color = "#fff";
    div.style.padding = "10px 20px";
    div.className = "timeSlot__div" + time;
    div.innerHTML = time;

    let ok = 1;

    slots.forEach((slot) => {
      if (slot === time) {
        setSlotErr("Slot already added!");
        ok = 0;
      }
    });

    if (!ok) {
      return;
    }

    setSlotErr("");

    slots.push(time);


    div.onclick = function () {
      let timeToDelete = div.innerHTML;
      let idx = slots.indexOf(timeToDelete);
      if (idx > -1) {
        slots.splice(idx, 1);
      }
      div.remove();
    };

    document.getElementsByClassName("timeSlots__div")[0].appendChild(div);
  };

  const createTour = () => {
    endTimings = slots.map((slot) => {
      let d1 = new Date();
      d1.setHours(slot.slice(0, 2));
      d1.setMinutes(slot.slice(3, 5));
      d1.setMinutes(d1.getMinutes() + parseInt(timePerTour));
      return d1.getHours() + ":" + d1.getMinutes();
    });

    for (let i = 0; i < slots.length; i++) {
      let x = {
        start: slots[i],
        end: endTimings[i],
      };
      slotTimings.push(x);
    }

    let selectedDay = document.getElementsByClassName("selected day");
    let daysArray = [];
    for (let i = 0; i < selectedDay.length; i++) {
      daysArray.push(getFullDayName(selectedDay[i].innerText));
    }

    setBtnLoader(true)
    makePostRequest(
      DJANGO_URL + "/guide/package-create",
      {
        timings: slotTimings,
        title: tourName,
        description: tourDesc,
        maximum_person_limit: tourPerson,
        fee: tourPrice,
        availability: daysArray,
      },
      "application/json"
    ).then(() => window.location.replace("/guide/dashboard"));
  };

  return (
    <div className="designTour">
      <PageHeader
        pageTitle={
          <>
            Design your <span style={{ color: "#f78383" }}>Tour</span>
          </>
        }
      />
      <form style={{ marginTop: "60px" }}>
        <label htmlFor="timePerTour">Tour Name</label>
        <br />
        <input
          type="text"
          name="timePerTour"
          required
          placeholder="Explore Taj Mahal..."
          value={tourName}
          onChange={(e) => setTourName(e.target.value)}
        />
        <br />
        <label htmlFor="timePerTour">Tour Name</label>
        <br />
        <textarea
          type="number"
          name="timePerTour"
          required
          spellCheck="false"
          placeholder="Explain your tour here"
          value={tourDesc}
          onChange={(e) => setTourDesc(e.target.value)}
        />
        <br />
        <label htmlFor="timePerTour">Time per Tour (mins.)</label>
        <br />
        <input
          type="number"
          name="timePerTour"
          required
          value={timePerTour}
          onChange={(e) => setTimePerTour(e.target.value)}
        />
        <br />

        <label htmlFor="days">Days available</label>
        <div className="designTour__days">
          <div
            className={monday ? "selected day" : "day"}
            onClick={() => setMonday((prev) => !prev)}
          >
            Mon
          </div>
          <div
            className={tuesday ? "selected day" : "day"}
            onClick={() => setTuesday((prev) => !prev)}
          >
            Tue
          </div>
          <div
            className={wednesday ? "selected day" : "day"}
            onClick={() => setWednesday((prev) => !prev)}
          >
            Wed
          </div>
          <div
            className={thursday ? "selected day" : "day"}
            onClick={() => setThursday((prev) => !prev)}
          >
            Thu
          </div>
          <div
            className={friday ? "selected day" : "day"}
            onClick={() => setFriday((prev) => !prev)}
          >
            Fri
          </div>
          <div
            className={saturday ? "selected day" : "day"}
            onClick={() => setSaturday((prev) => !prev)}
          >
            Sat
          </div>
          <div
            className={sunday ? "selected day" : "day"}
            onClick={() => setSunday((prev) => !prev)}
          >
            Sun
          </div>
        </div>

        <label htmlFor="timeSlots">Time Slots (24 hrs format)</label>
        <br />
        <div className="timeSlots">
          <input
            type="time"
            name="timeSlot"
            required
            onChange={(e) => setTime(e.target.value)}
            value={time}
          />
          <div className="btn__addTimeSlot flex-center flex" onClick={addSlot}>
            Add +
          </div>
        </div>
        <p className="slotErr">{slotErr}</p>

        <div className="timeSlots__div"></div>
        <label htmlFor="timePerTour">Maximum Person Per Slot</label>
        <br />
        <input
          type="number"
          name="timePerTour"
          required
          value={tourPerson}
          onChange={(e) => setTourPerson(e.target.value)}
        />
        <br />
        <label htmlFor="tourPrice">Tour Price (₹ Per Person)</label>
        <br />
        <input
          type="number"
          onInput={(e) => setTourPrice(e.target.value)}
          value={tourPrice}
          name="tourPrice"
          required
        />
        <br />
      </form>

      <button className="btn" onClick={createTour}>
        {btnLoader ? "Creating Tour..." : "Create Tour"}
        {btnLoader && (
          <i className="fa fa-spinner fa-pulse" style={{ marginLeft: "8px" }} />
        )}
      </button>
    </div>
  );
}

export default DesignTour;
