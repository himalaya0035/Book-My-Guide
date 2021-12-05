import React from 'react'

function IconWithText({iconType,headingText,valueText,marginRight=0}) {
    return (
        <div
            className="flex flex-center"
            style={{ marginRight: marginRight }}
          >
            <i
              className={iconType}
              style={{
                color: "#f78383",
                fontSize: "25px",
                marginRight: "12px",
              }}
            ></i>
            <div>
              <h6 style={{color:"#7e7e7e",textTransform:"uppercase"}}>{headingText}</h6>
              <h3>{valueText}</h3>
            </div>
          </div>
    )
}

export default IconWithText
