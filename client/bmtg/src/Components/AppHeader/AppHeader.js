import React, {useEffect, useState} from "react";
import './AppHeader.css'
import {parseJwt} from "../../jwtparser";
import {Link} from "react-router-dom";
import {getCoordintes} from "../../getCity";

function AppHeader() {

    const [img, setImg] = useState('')
    const [name, setName] = useState('')

    useEffect(() => {
        try {
            const tokens = JSON.parse(window.localStorage.getItem('tokens'))
            const access_token = tokens['access_token']
            const {full_name, image} = parseJwt(access_token)
            setName(full_name)
            setImg(image)
        } catch (e) {
            window.location.href = "/"
        }
    }, [setImg, setName])

    function handleClick() {
        getCoordintes()
        setTimeout(() => {
            window.location.reload()
        }, 2000)
    }

    return (

        <div className="hiMessageAndSetLocation flex flex-sb">
            <Link to={"/profile"} className="flex flex-alignCenter" style={{
                textDecoration: "none",
                color: "black"
            }}>
                <div>
                    <img className="userProfilePic"
                         src={img}
                         alt=""/>
                </div>
                <p style={{marginLeft: "15px"}}>Hi, {name.split(" ")[0]} !</p>
            </Link>
            <div className="imageBackground flex flex-center" onClick={handleClick}>
                <i onClick={handleClick} className="fa fa-map-marker-alt" id="s" style={{color: "#f78383"}}/>
            </div>
        </div>
    );
}

export default AppHeader;
