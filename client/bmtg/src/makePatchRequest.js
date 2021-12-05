import axios from "axios";
import {getAccessToken} from "./jwtparser";

export const makePatchRequest = async (url, data, contentType) => {
    const accessToken = getAccessToken()
    return await axios.patch(url, data, {
        headers: {
            'Content-Type': contentType,
            'Authorization': 'Bearer ' + accessToken
        }
    });
}