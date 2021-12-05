import React from "react";
import {NavLink} from "react-router-dom";
import "./BottomNav.css";

function BottomNav({userObject}) {
    return (
        <div className="bottomBar flex flex-sa flex-alignCenter">
            <NavLink
                to="/app"
                style={{textDecoration: "none"}}
                className={({isActive}) => (
                    isActive ? "flex flex-center bottomBarIcon active" : "flex flex-center bottomBarIcon"
                )}
            >
                <i className="fa fa-home"/>
            </NavLink>
            <NavLink
                to="/favourites"
                style={{textDecoration: "none"}}

                className={({isActive}) => (
                    isActive ? "flex flex-center bottomBarIcon active" : "flex flex-center bottomBarIcon"
                )}

            >
                <i className="fa fa-heart"/>
            </NavLink>

            <NavLink
                to={userObject.hasOwnProperty('partner_is_verified') ? "/partner/dashboard" : "/beapartner"}
                style={{textDecoration: "none"}}

                className={({isActive}) => (
                    isActive ? "flex flex-center bottomBarIcon active" : "flex flex-center bottomBarIcon"
                )}

            >
                {userObject.hasOwnProperty('partner_is_verified') ? <i className="fa fa-tachometer-alt"/> :
                    <i className="fa fa-handshake"/>}
            </NavLink>


            <div
                style={{textDecoration: "none"}}
                className="flex flex-center bottomBarIcon"
                onClick={() => {
                    window.localStorage.clear();
                    window.location.replace("/")
                }}
            >
                <i className="fa fa-sign-in-alt"/>
            </div>

        </div>
    );
}

export default BottomNav;
