import React, {useState} from "react";

function GeneralDetails({nextStep, values, handleChange}) {
    const [stateErr, setStateErr] = useState("");
    const [cityErr, setCityErr] = useState("");
    const [phoneErr, setPhoneErr] = useState("");
    const checkDetails = () => {
        let ok = 1;
        if (values.state === "") {
            setStateErr("Enter your State Name");
            ok = 0;
        } else {
            setStateErr("");
        }
        if (values.city === "") {
            setCityErr("Enter the City you cover");
            ok = 0;
        } else {
            setCityErr("");
        }

        if (values.contact === "") {
            setPhoneErr("Enter your contact no");
            ok = 0;
        } else {
            setPhoneErr("");
        }

        if (ok) {
            nextStep();
        }
    };

    return (
        <div className="generalDetails">
            <h1 className="generalDetails__heading">General Details</h1>
            <form>
                <label htmlFor="city">City</label>
                <br/>
                <input
                    type="text"
                    name="city"
                    required
                    spellCheck="false"
                    onChange={handleChange("city")}
                    value={values.city}
                />

                <br/>
                <p>{stateErr}</p>
                <br/>
                <label htmlFor="State">State</label>
                <br/>
                <input
                    type="text"
                    name="state"
                    required
                    spellCheck="false"
                    onChange={handleChange("state")}
                    value={values.state}
                />
                <br/>
                <p>{cityErr}</p>
                <br/>
                <label htmlFor="name">Contact No</label>
                <br/>
                <input
                    type="number"
                    name="Contact"
                    required
                    onChange={handleChange("contact")}
                    value={values.contact}
                />

                <br/>
                <p>{phoneErr}</p>
                <br/>
            </form>
            <button onClick={checkDetails} className="btn__next">
                Next
            </button>
        </div>
    );
}

export default GeneralDetails;
