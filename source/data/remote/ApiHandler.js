import axios from "axios"
import Urls from "./Urls"


export default class ApiHandler {
   
    sendSimpleGetRequest(url, _body, onResponse, onError) {
        console.log("=====================API CALLED========================")
        console.log("URL=====> ", url)
        console.log("BODY PART=====> ", _body)
        axios.get(url, _body, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then((resp) => {
            console.log("Response======>", JSON.stringify(resp.data))
                onResponse(resp)
        }).catch((ex) => {
            console.log("Error=======>", ex)
            if (ex == 'Error: Network Error') {
                onError("Network Request Failed")
            }
            else {
                onError(ex.message)
            }
        })
    }


  
}

