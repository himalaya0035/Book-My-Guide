import React, {useState} from "react";

function BankDetails({ prevStep, handleChange, values, handleSubmit,btnLoader }) {
  const [bankNameErr, setBankNameErr] = useState("");
  const [ifscErr, setIfscErr] = useState("");
  const [accHolderErr, setAccHolderErr] = useState("");
  const [bankAccErr, setBankAccErr] = useState("");
  const [confBankAccErr, setConfBankAccErr] = useState("");
  const [accVerifyErr, setAccVerifyErr] = useState("");
 
  const checkDetails = () => {
    let ok = 1;

    if (values.bankName === "") {
      setBankNameErr("Enter your Bank Name");
      ok = 0;
    } else {
      setBankAccErr("");
    }

    if (values.ifsc === "") {
      setIfscErr("Enter the bank's IFSC code");
      ok = 0;
    } else {
      setIfscErr("");
    }

    if (values.bankAccHolderName === "") {
      setAccHolderErr("Enter the Account's Holder Name");
      ok = 0;
    } else {
      setAccHolderErr("");
    }

    if (values.bankAcc === "") {
      setBankAccErr("Enter your Bank Account no.");
      ok = 0;
    } else {
      setBankAccErr("");
    }

    if (values.confBankAcc === "") {
      setConfBankAccErr("Enter the Account no. again");
      ok = 0;
    } else {
      setConfBankAccErr("");
    }

    if (values.confBankAcc !== values.bankAcc) {
      setConfBankAccErr("Account no. not matched!");
    } else {
      setConfBankAccErr("");
    }

    if (values.accVerifyPhoto === null) {
      setAccVerifyErr("Upload your passbook/cancelled cheque photo");
      ok = 0;
    } else {
      setAccVerifyErr("");
    }

    if (ok) {
      handleSubmit();
    }
  };

  return (
    <div className="bankDetails">
      <h1>Bank Details</h1>
      <form>
        <label htmlFor="bankName">Bank Name</label>
        <br />
        <input
          type="text"
          name="bankName"
          required
          spellCheck="false"
          onChange={handleChange("bankName")}
          value={values.bankName}
        />
        <br />
        <p>{bankNameErr}</p>
        <br />
        <label htmlFor="ifsc">IFSC code</label>
        <br />
        <input
          type="text"
          name="ifsc"
          required
          onChange={handleChange("ifsc")}
          value={values.ifsc}
        />
        <br />
        <p>{ifscErr}</p>
        <br />
        <label htmlFor="accHolder">Account Holder Name</label>
        <br />
        <input
          type="text"
          name="accHolder"
          required
          onChange={handleChange("bankAccHolderName")}
          value={values.bankAccHolderName}
        />
        <br />
        <p>{accHolderErr}</p>
        <br />
        <label htmlFor="accNo">Bank Account no.</label>
        <br />
        <input
          type="number"
          name="bankAcc"
          required
          onChange={handleChange("bankAcc")}
          value={values.bankAcc}
        />
        <br />
        <p>{bankAccErr}</p>
        <br />
        <label htmlFor="confirmAccNo">Confirm Account no.</label>
        <br />
        <input
          type="number"
          name="confirmAccNo"
          required
          onChange={handleChange("confBankAcc")}
          value={values.confBankAcc}
        />
        <br />
        <p>{confBankAccErr}</p>
        <br />
        <label htmlFor="bankAccVerify">Passbook / Cancel Cheque photo</label>
        <br />
        <input
          type="file"
          name="bankAccVerify"
          id="imgInp"
          required
          onChange={handleChange("accVerifyPhoto")}
          style={{ display: "none" }}
        />

        {values.accVerifyPhoto !== null ? (
          <p style={{ color: "green" }}>{values.accVerifyPhoto.name}</p>
        ) : (
          <label htmlFor="imgInp">Click here to upload</label>
        )}

        <p>{accVerifyErr}</p>
        <br />
      </form>
      <div className="partnerForm__buttons">
        <button onClick={prevStep} className="btn__prev btn__submit">
          Prev
        </button>
        <button onClick={checkDetails} className="btn__next btn__submit">
        {btnLoader ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </div>
  );
}

export default BankDetails;
