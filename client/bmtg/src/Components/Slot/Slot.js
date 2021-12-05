import React, { useState } from "react";
import SlotModal from "../SlotModal/SlotModal";

function Slot({ id, timing, date }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {open && (
        <SlotModal
          key={id}
          open={open}
          handleClose={handleClose}
          id={id}
          timingId={timing.id}
          startTime={timing.start.slice(0, 5)}
          date={date}
        />
      )}
      <div
        className="guideDashboard__slot"
        onClick={handleOpen}
        style={{ cursor: "pointer" }}
      >
        {timing.start.slice(0, 5)}

        <i className="fa fa-angle-right"></i>
      </div>
    </>
  );
}

export default Slot;