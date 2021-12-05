import React from 'react'
import './Button.css'

function Button({text,icon}) {
    return (
        <button className="appButton">
            <p>{text}</p>
            {icon && <i className={icon} style={{color:"white", position:"absolute",right:"18px",fontSize:"20px",bottom:"29px"}}></i>}
        </button>
    )
}

export default Button
