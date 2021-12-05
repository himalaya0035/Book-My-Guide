import React, {useState,useEffect} from "react";
import SearchResult from "./SearchResult";
import "./SearchScreen.css";
import {useNavigate} from 'react-router-dom'
import {makeGetRequest} from "../../makeGetRequest";
import DJANGO_URL from "../../constants";

function SearchScreen() {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState('');
    const [allPlaces, setAllPlaces] = useState([]);
    const [closeIcon, setCloseIcon] = useState(false)
    
    useEffect(() => {
        async function fetchAllPlaces(){
            const response = await makeGetRequest(DJANGO_URL + "/guide/search");
            let combinedArray = response.data.places.concat(response.data.citys)
            setAllPlaces(combinedArray)
        }
        fetchAllPlaces();
        document.getElementById('realSearchBox').focus()
    }, [])

 
    return (
        <div>
            <div className="realSearchBoxContainer">
                <i
                    className="fa fa-angle-left"
                    style={{
                        position: "absolute",
                        top: "16px",
                        left: "10px",
                        color: "#f78383",
                        fontSize: "20px",
                    }}
                    onClick={() => navigate(-1)}
                />
                <input
                    type="text"
                    value={searchText}
                    onChange={(e) => {
                        setSearchText(e.target.value)
                        e.target.value.length === 0 ? setCloseIcon(false) : setCloseIcon(true);
                    }}
                    id="realSearchBox"
                    name=""
                    spellCheck = 'false'
                    placeholder="Search For Places..."
                />
                <i
                    className={closeIcon ? 'fa fa-times' : 'fa fa-search'}
                    style={{
                        position: "absolute",
                        top: "18px",
                        right: "20px",
                        color: "#f78383",
                        fontSize: "17px",
                    }}
                    onClick = {() => {
                        if (closeIcon){
                            setSearchText('');
                            setCloseIcon(false)
                        }else{

                        }
                    }}
                />
            </div>
            <div className="searchResults">
                {allPlaces.filter(place => {
                    if (searchText === ''){
                        return false;
                    }else if (place.place_name && place.place_name.toLowerCase().includes(searchText.toLowerCase())){
                        return true;
                    }else return !!(place.city && place.city.toLowerCase().includes(searchText.toLowerCase()));
                }).map(result => <SearchResult key={result.place_name ? result.id : result.id+100} data={result}/>)}
            </div>
        </div>
    );
}

export default SearchScreen;
