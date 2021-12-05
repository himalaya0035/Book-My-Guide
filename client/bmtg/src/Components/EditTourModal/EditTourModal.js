import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import "./EditTourModal.css";
import {makeGetRequest} from "../../makeGetRequest";
import DJANGO_URL from "../../constants";
import {makePatchRequest} from "../../makePatchRequest";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2.5,
    borderRadius: "15px",
    height: "80vh",
    overflowY: "auto",
};

function EditTourModal({open, handleClose}) {
    const [tourName, setTourName] = useState("");
    const [tourDesc, setTourDesc] = useState("");
    const [timePerTour, setTimePerTour] = useState("");
    const [tourPerson, setTourPerson] = useState(0);
    const [tourPrice, setTourPrice] = useState(0);
    const url = DJANGO_URL + "/guide/update";


    useEffect(() => {
        async function fetchAndSetData() {
            const res = await makeGetRequest(url);
            const {title, description, maximum_person_limit, fee} = res.data;
            setTourName(title)
            setTourDesc(description);
            setTourPerson(maximum_person_limit)
            setTourPrice(fee)
        }

        fetchAndSetData()
    }, [])

    async function handleSubmit(e) {
        e.preventDefault()
        const data = {title: tourName, description: tourDesc, maximum_person_limit: tourPerson, fee: tourPrice}
        await makePatchRequest(url, data, "application/json")
        handleClose(data)
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="editTour">
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="timePerTour">Tour Name</label>
                            <br/>
                            <input
                                type="text"
                                name="timePerTour"
                                required
                                placeholder="Explore Taj Mahal..."
                                value={tourName}
                                onChange={(e) => setTourName(e.target.value)}
                            />
                            <br/>
                            <label htmlFor="tourDesc">Tour Description</label>
                            <br/>
                            <textarea
                                type="number"
                                name="tourDesc"
                                required
                                spellCheck="false"
                                placeholder="Explain your tour here"
                                value={tourDesc}
                                onChange={(e) => setTourDesc(e.target.value)}
                            />
                            <br/>
                            <label htmlFor="timePerTour">Time per Tour (mins.)</label>
                            <br/>
                            <input
                                type="number"
                                name="timePerTour"
                                required
                                value={timePerTour}
                                onChange={(e) => setTimePerTour(e.target.value)}
                            />
                            <br/>
                            <label htmlFor="timePerTour">Maximum Person Per Slot</label>
                            <br/>
                            <input
                                type="number"
                                name="timePerTour"
                                required
                                value={tourPerson}
                                onChange={(e) => setTourPerson(e.target.value)}
                            />
                            <br/>
                            <label htmlFor="tourPrice">Tour Price (₹ Per Person)</label>
                            <br/>
                            <input
                                type="number"
                                onInput={(e) => setTourPrice(e.target.value)}
                                value={tourPrice}
                                name="tourPrice"
                                required
                            />
                            <br/>
                            <button className="btn">Edit</button>
                        </form>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default EditTourModal;