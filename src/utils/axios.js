import axios from "axios";
export const details = {
    base_url :process.env.REACT_APP_BASE_URL,
    
   
}

export const BASE_URL = process.env.REACT_APP_BASE_URL
 const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    // timeout: 1000,
    headers :{
        'Content-Type' :'application/json'
    }
  });
export default instance

