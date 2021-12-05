import React, {useState} from "react";
import PageHeader from "../../Components/PageHeader/PageHeader";
import BankDetails from "./BankDetails";
import GeneralDetails from "./GeneralDetails";
import IdentityVerify from "./IdentityVerify";
import "./PartnerForm.css";
import {makePostRequest} from "../../makePostRequest";
import DJANGO_URL from "../../constants";

function PartnerForm() {
    const [step, setStep] = useState(1);
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [contact, setContact] = useState("");
    const [aadhar, setAadhar] = useState("");
    const [aadharPhoto, setAadharPhoto] = useState(null);
    const [pan, setPan] = useState("");
    const [panPhoto, setPanPhoto] = useState(null);
    const [bankAcc, setBankAcc] = useState("");
    const [confBankAcc, setConfBankAcc] = useState("");
    const [ifsc, setIfsc] = useState("");
    const [bankName, setBankName] = useState("");
    const [bankAccHolderName, setBankAccHolderName] = useState("");
    const [accVerifyPhoto, setAccVerifyPhoto] = useState(null);
    const [btnLoader, setBtnLoader] = useState(false);
 
    const values = {
        state,
        city,
        contact,
        aadhar,
        aadharPhoto,
        pan,
        panPhoto,
        bankAcc,
        confBankAcc,
        ifsc,
        bankName,
        bankAccHolderName,
        accVerifyPhoto,
    };

    const handleSubmit = () => {
        const fm = new FormData()

        fm.append('location__city', values.city)
        fm.append('location__state', values.state)


        fm.append('adhaar_num', values.aadhar)
        fm.append('adhaar_img', values.aadharPhoto)
        fm.append('pancard_num', values.pan)
        fm.append('pancard_img', values.panPhoto)

        fm.append('bank_details_IFSC', values.ifsc)
        fm.append('bank_details_Account_name', values.bankAccHolderName)
        fm.append('back_details_Account_number', values.bankAcc)
        fm.append('bank_account_verification_image', values.accVerifyPhoto)
        fm.append("phone_number", contact)
        setBtnLoader(true)
        makePostRequest(DJANGO_URL + "/guide/register-partner", fm, "multipart/form-data")
            .then(() => window.location.replace("/app"))
    };


    const nextStep = () => {
        setStep((prev) => prev + 1);
    };

    const prevStep = () => {
        setStep((prev) => prev - 1);
    };

    const handleChange = (input) => (e) => {
        if (input === "city") {
            setCity(e.target.value);
        } else if (input === "contact") {
            setContact(e.target.value);
        } else if (input === "state") {
            setState(e.target.value)
        } else if (input === "aadhar") {
            setAadhar(e.target.value);
        } else if (input === "aadharPhoto") {
            setAadharPhoto(e.target.files[0]);
        } else if (input === "pan") {
            setPan(e.target.value);
        } else if (input === "panPhoto") {
            setPanPhoto(e.target.files[0]);
        } else if (input === "bankAcc") {
            setBankAcc(e.target.value);
        } else if (input === "confBankAcc") {
            setConfBankAcc(e.target.value);
        } else if (input === "ifsc") {
            setIfsc(e.target.value);
        } else if (input === "bankName") {
            setBankName(e.target.value);
        } else if (input === "bankAccHolderName") {
            setBankAccHolderName(e.target.value);
        } else if (input === "accVerifyPhoto") {
            setAccVerifyPhoto(e.target.files[0]);
        }
    };


    return (
        <div className="partnerForm">
            <PageHeader pageTitle={<>Become a <span style={{color: "#f78383"}}>Partner</span></>}/>
            <div className="partnerForm__main" style={{marginTop: "60px"}}>
                {step === 1 && (
                    <GeneralDetails
                        nextStep={nextStep}
                        values={values}
                        handleChange={handleChange}
                    />
                )}
                {step === 2 && (
                    <IdentityVerify
                        nextStep={nextStep}
                        prevStep={prevStep}
                        values={values}
                        handleChange={handleChange}
                    />
                )}
                {step === 3 && (
                    <BankDetails
                        prevStep={prevStep}
                        values={values}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        btnLoader = {btnLoader}
                    />
                )}
            </div>
        </div>
    );
}

export default PartnerForm;
