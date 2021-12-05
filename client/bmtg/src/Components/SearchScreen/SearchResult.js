import React, {useEffect} from "react";

function SearchResult({data}) {

    useEffect(() => {

    })

    const handleClick = () => {
        if (data.city) {
            window.localStorage.setItem("currentCity", data.city);
            setTimeout(() => {
                window.location.replace("/app")
            }, 500)
        }
        else {
            window.location.href = "/place/" + data.id
        }
    }

    return (
        <div className="searchResult flex" tabIndex={0} onClick={handleClick}>

            <div className="flex flex-sb">
                <div>
                    <h3>{data.place_name || data.city}</h3>
                </div>
                <i
                    className="fa fa-angle-right"
                    style={{marginTop: "2px", fontSize: "18px", color: "#f78383"}}
                />
            </div>
        </div>

    );
}

export default SearchResult;
