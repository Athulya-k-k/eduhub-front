import axios from "axios";
export const details = {
    base_url : ' http://127.0.0.1:8000//',
   
}

export const BASE_URL = ' http://127.0.0.1:8000/'
 const instance = axios.create({
    baseURL: ' http://127.0.0.1:8000/',
    // timeout: 1000,
    headers :{
        'Content-Type' :'application/json'
    }
  });
export default instance

// http://localhost:8000/