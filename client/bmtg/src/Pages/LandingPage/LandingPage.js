import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import './LandingPage.css'
import axios from "axios";
import DJANGO_URL from "../../constants";


function LandingPage() {
    window.localStorage.setItem("currentCity", "New Delhi")

    function handleCredentialResponse(response) {
        axios.post(DJANGO_URL + "/accounts/oauth/login", {
            "token": response.credential
        }).then(res => {
            window.localStorage.setItem("tokens", JSON.stringify(res.data))
            window.location.replace("/app")
        })

    }

    useEffect(() => {
        window.onload = () => {
            window.google.accounts.id.initialize({
                client_id: "721386340363-t8guun6ifvpdldqucfpnskaqet3sbnan.apps.googleusercontent.com",
                callback: handleCredentialResponse
            });
            window.google.accounts.id.renderButton(
                document.getElementById("buttonDiv"),
                {theme: "outline", size: "large"}  // customization attributes
            );
            window.google.accounts.id.prompt();
           
        }
        const token = JSON.parse(localStorage.getItem('tokens'))
        if (token){
            if (token.access_token){
                window.location.replace('/app');
            }
        }
        
    })

    return (
        <div className="landingPageWrapper">
            <h3
                id="appName"
                style={{
                    textAlign: "center",
                    position: "fixed",
                    top: "30px",
                    color: "white",
                    zIndex: 10,
                    left: "50%",
                    transform: "translateX(-50%)",
                }}
            >
                Book My Guide
            </h3>
            <div
                className="signInAction flex"
                style={{flexDirection: "column", alignItems: "center"}}
            >
                <h2
                    style={{
                        textAlign: "center",
                        color: "white",
                        marginBottom: "30px",
                        letterSpacing: "1px",
                        width: "300px",
                    }}
                >
                    Begin your <br/> journey with us!
                </h2>
                <Link to="/app">

                    <div id="buttonDiv">Signin</div>

                </Link>

            </div>
            <div className="overlayBackground"/>
        </div>
    );
}

export default LandingPage;
// google ke ye button ache hai