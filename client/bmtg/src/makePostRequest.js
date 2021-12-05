import axios from "axios";
import {getAccessToken} from "./jwtparser";
// 'multipart/form-data'
// application/json


export const makePostRequest = async (url, data, contentType) => {
    const accessToken = getAccessToken()
    return await axios.post(url, data, {
        headers: {
            'Content-Type': contentType,
            'Authorization': 'Bearer ' + accessToken
        }
    })
}