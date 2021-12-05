import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Modal from "@mui/material/Modal";
import "./FilterModal.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 370,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
  borderRadius: "15px",
};

function valuetext(value) {
  return `${value}°C`;
}

function FilterModal({ open, handleClose, guides, setGuides }) {
  const [value, setValue] = useState([50, 500]);
  const [btn1, setBtn1] = useState(false);
  const [btn2, setBtn2] = useState(false);
  const [btn3, setBtn3] = useState(false);
  const [btn4, setBtn4] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = (e) => {
    let i;
    let classname = e.target.className.split(" ")[1];
    let btn = classname[classname.length - 1];
    let allBtns = [];
    for (i = 1; i <= 4; ++i) {
      allBtns.push(document.getElementsByClassName("filterModal__btn" + i)[0]);
    }

    for (i = 1; i <= 4; ++i) {
      allBtns[i - 1].className =
        "filterModal__btnUnactive filterModal__btn" + i;
    }
    e.target.className = "filterModal__btnActive filterModal__btn" + btn;

    setBtn1(false);
    setBtn2(false);
    setBtn3(false);
    setBtn4(false);

    btn = parseInt(btn);

    if (btn === 1) {
      setBtn1(true);
    } else if (btn === 2) {
      setBtn2(true);
    } else if (btn === 3) {
      setBtn3(true);
    } else if (btn === 4) {
      setBtn4(true);
    }
  };

  const handleSubmit = async () => {
    let rating = 0;

    if (btn1) {
      rating = 1.0;
    } else if (btn2) {
      rating = 2.0;
    } else if (btn3) {
      rating = 3.0;
    } else if (btn4) {
      rating = 4.0;
    }
    rating = rating.toString();

    let newGuides = guides;

    if (rating !== "0") {
      newGuides = newGuides.filter((guide) => {
        return guide.rating >= rating;
      });
    }

    if (value[0] !== 0 && value[1] !== 0) {
      newGuides = newGuides.filter((guide) => {
        return guide.fee >= value[0] && guide.fee <= value[1];
      });
    }
    await setGuides(newGuides);

    setBtn1(false);
    setBtn2(false);
    setBtn3(false);
    setBtn4(false);

    handleClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h3 className="filterModal__headingPrice">
            <p>
              Price{" "}
              <span style={{ color: "#808080" }}>
                ₹ {value[0]} - {value[1]}
              </span>{" "}
            </p>
          </h3>
          <Slider
            getAriaLabel={() => "Temperature range"}
            value={value}
            onChange={handleChange}
            getAriaValueText={valuetext}
            min={50}
            max={2000}
            step={50}
            color="primary"
          />
          <h3>Rating</h3>
          <div className="filterModal__buttons">
            <button
              className="filterModal__btnUnactive filterModal__btn1"
              onClick={handleClick}
            >
              Rating 1.0+
            </button>
            <button
              className="filterModal__btnUnactive filterModal__btn2"
              onClick={handleClick}
            >
              Rating 2.0+
            </button>
            <button
              className="filterModal__btnUnactive filterModal__btn3"
              onClick={handleClick}
            >
              Rating 3.0+
            </button>
            <button
              className="filterModal__btnUnactive filterModal__btn4"
              onClick={handleClick}
            >
              Rating 4.0+
            </button>
          </div>
          <button className="btn__next" onClick={handleSubmit}>
            Filter
          </button>
        </Box>
      </Modal>
    </div>
  );
}

export default FilterModal;