import axios from "axios";
import {getAccessToken} from "./jwtparser";

export const makeGetRequest = async (url) => {
    const accessToken = getAccessToken()
    return await axios.get(url, {
        headers: {
            'Authorization': 'Bearer ' + accessToken

        }
    })
}