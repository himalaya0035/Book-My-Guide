import React, {useEffect, useState} from "react";
import "./TourGuideForm.css";
import PageHeader from '../../Components/PageHeader/PageHeader'
import {getAccessToken, parseJwt} from "../../jwtparser";
import {makePostRequest} from "../../makePostRequest";
import DJANGO_URL from "../../constants";

function TourGuideForm() {
    const [name, setName] = useState("");
    const [place, setPlace] = useState("");
    const [license, setLicense] = useState("");
    const [licensePhoto, setLicensePhoto] = useState(null);
    const [nameErr, setNameErr] = useState("");
    const [placeErr, setPlaceErr] = useState("");
    const [licenseErr, setLicenseErr] = useState("");
    const [licensePhotoErr, setLicensePhotoErr] = useState("");
    const [btnLoader, setBtnLoader] = useState(false);

    useEffect(() => {
        const {full_name} = parseJwt(getAccessToken())
        setName(full_name)
    }, [setName])

    const checkDetails = () => {
        let ok = 1;

        if (name === "") {
            ok = 0;
            setNameErr("Enter your name");
        } else {
            setNameErr("");
        }

        if (place === "") {
            ok = 0;
            setPlaceErr("Enter the place you will cover");
        } else {
            setPlaceErr("");
        }

        if (license === "") {
            ok = 0;
            setLicenseErr("Enter your tour guide license no.");
        } else {
            setLicenseErr("");
        }

        if (licensePhoto === null) {
            ok = 0;
            setLicensePhotoErr("Upload your tour guide license photo");
        } else {
            setLicensePhotoErr("");
        }

        if (ok) {
            const fm = new FormData()
            fm.append("license_number", license)
            fm.append("license", licensePhoto)
            fm.append("place_name", place)
            setBtnLoader(true)
            makePostRequest(DJANGO_URL + "/guide/register-guide", fm, "multipart/form-data").then(() => window.location.replace("/app"))
        }
    };

    return (
        <div className="tourGuideForm">
            <PageHeader pageTitle={<>Be A <span style={{color: "#f78383"}}>Tour Guide</span></>}/>
            <form style={{marginTop: "60px"}}>
                <label htmlFor="name">Name</label>
                <br/>
                <input
                    type="text"
                    name="name"
                    value={name}
                    readOnly={true}
                />
                <br/>
                <p>{nameErr}</p>
                <br/>
                <label htmlFor="place">Place</label>
                <br/>
                <input
                    type="text"
                    name="place"
                    required
                    onChange={(e) => setPlace(e.target.value)}
                    value={place}
                />
                <br/>
                <p>{placeErr}</p>
                <br/>
                <label htmlFor="license">License No.</label>
                <br/>
                <input
                    type="text"
                    name="license"
                    required
                    onChange={(e) => setLicense(e.target.value)}
                    value={license}
                />
                <br/>
                <p>{licenseErr}</p>
                <br/>
                <label htmlFor="licensePhoto">License Photo</label>
                <br/>
                <input
                    type="file"
                    name="licensePhoto" 
                    required
                    onChange={(e) => setLicensePhoto(e.target.files[0])}
                />
                <br/>
                <p>{licensePhotoErr}</p>
                <br/>
            </form>
            <button onClick={checkDetails}>
            {btnLoader ? 'Submitting...' : 'Submit'}
            {btnLoader && <i className="fa fa-spinner fa-pulse" style={{marginLeft:"8px"}}/>}
            </button>
        </div>
    );
}

export default TourGuideForm;
