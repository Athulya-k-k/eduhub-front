import axios from "axios";
export const details = {
    base_url : ' https://eduhub-kof9.onrender.com/',
    
   
}

export const BASE_URL = ' https://eduhub-kof9.onrender.com/'
 const instance = axios.create({
    baseURL: ' https://eduhub-kof9.onrender.com/',
    // timeout: 1000,
    headers :{
        'Content-Type' :'application/json'
    }
  });
export default instance

// http://localhost:8000/