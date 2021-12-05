import React from "react";

function SlotModalPerson({ name, imgUrl, people, price}) {
  return (
    <div className="slotModal__person">
      <div className="slotModal__personImg">
        <img
          src={imgUrl}
          alt={name}
        />
      </div>

      <div className="slotModal__personDetails">
        <p
          title={name}
          className="slotModal__personDetails__name"
          style={{ fontSize: "1.2rem", color: "#000" }}
        >
          {name}
        </p>
        <p>
          Money paid <span style={{ color: "#f78383" }}>₹{price}</span>
        </p>
        <p>
          No. of People <span style={{ color: "#f78383" }}>x{people}</span>
        </p>

        <p>
          Contact{" "}
          <span style={{ color: "#f78383", marginLeft: "20px" }}>
            {/*{contact}*/}
          </span>
        </p>
      </div>
    </div>
  );
}

export default SlotModalPerson;
