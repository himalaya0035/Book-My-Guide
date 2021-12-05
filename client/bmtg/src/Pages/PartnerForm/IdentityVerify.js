import React, {useState} from "react";
import "./PartnerForm.css";

function IdentityVerify({ nextStep, prevStep, values, handleChange }) {
  const [aadharErr, setAadharErr] = useState("");
  const [aadharPhotoErr, setAadharPhotoErr] = useState("");
  const [panErr, setPanErr] = useState("");
  const [panPhotoErr, setPanPhotoErr] = useState("");

  const checkDetails = () => {
    let ok = 1;
    if (values.aadhar === "") {
      setAadharErr("Enter your aadhar no.");
      ok = 0;
    } else {
      setAadharErr("");
    }
    if (values.pan === "") {
      setPanErr("Enter your PAN no.");
      ok = 0;
    } else {
      setPanErr("");
    }
    if (values.aadharPhoto === null) {
      setAadharPhotoErr("Upload your aadhar card photo");
      ok = 0;
    } else {
      setAadharPhotoErr("");
    }
    if (values.panPhoto === null) {
      setPanPhotoErr("Upload your pan card photo");
      ok = 0;
    } else {
      setPanPhotoErr("");
    }

    if (ok) {
      nextStep();
    }
  };

  return (
    <div className="identityVerify">
      <h1>Identity verification</h1>

      <form>
        <label htmlFor="aadhar">Aadhar No.</label>
        <br />
        <input
          type="number"
          name="aadhar"
          required
          onChange={handleChange("aadhar")}
          value={values.aadhar}
        />
        <p>{aadharErr}</p>
        <br />
        <label htmlFor="aadharPhoto">Aadhar Photo</label>
        <br />
        <input
          type="file"
          name="aadharPhoto"
          id="aadharPhoto"
          style={{ display: "none" }}
          required
          onChange={handleChange("aadharPhoto")}
        />
        {values.aadharPhoto !== null ? (
          <p style={{ color: "green" }}>{values.aadharPhoto.name}</p>
        ) : (
          <label htmlFor="aadharPhoto">Click here to upload</label>
        )}

        <br />
        <p>{aadharPhotoErr}</p>
        <br />
        <label htmlFor="pan">PAN No.</label>
        <br />
        <input
          type="text"
          name="pan"
          required
          onChange={handleChange("pan")}
          value={values.pan}
        />

        <br />
        <p>{panErr}</p>
        <br />
        <label htmlFor="panPhoto">PAN card Photo</label>
        <br />
        <input
          type="file"
          name="panPhoto"
          id="panPhoto"
          style={{ display: "none" }}
          required
          onChange={handleChange("panPhoto")}
        />

        {values.panPhoto !== null ? (
          <p style={{ color: "green" }}>{values.panPhoto.name}</p>
        ) : (
          <label htmlFor="panPhoto">Click here to upload</label>
        )}
        <br />
        <p>{panPhotoErr}</p>
        <br />
      </form>
      <div className="partnerForm__buttons">
        <button onClick={prevStep} className="btn__prev">
          Prev
        </button>
        <button onClick={checkDetails} className="btn__next">
          Next
        </button>
      </div>
    </div>
  );
}

export default IdentityVerify;
