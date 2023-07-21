import axios from "axios";
export const details = {
    base_url : ' http://localhost:8000/',
    
   
}

export const BASE_URL = ' http://localhost:8000/'
 const instance = axios.create({
    baseURL: ' http://localhost:8000/',
    // timeout: 1000,
    headers :{
        'Content-Type' :'application/json'
    }
  });
export default instance

