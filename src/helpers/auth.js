// import { toast } from "react-hot-toast";
// export default async function login(email, password){
//     console.log(email, password);
//     let response = await fetch('http://localhost:8000/api/token/', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type':'application/json'
//                 },
//                 body: JSON.stringify({'email': email, 'password': password})
//             })
        
//             let data = await response.json()
//             console.log('data',data);
            
//             if(response.status === 200){
//                 localStorage.setItem('authToken', JSON.stringify(data))
//                 toast.success('Login Success')
//                 return data;
                
//             }else{
//                 toast.error('Invalid User Credential')
//         }
// }

// export function getLocal(){
//     let response = localStorage.getItem('authToken');
//     return response;
// }




import { toast } from "react-hot-toast";

export default async function login(email, password) {
  try {
    const response = await fetch("http://localhost:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("authToken", JSON.stringify(data));
      toast.success("Login Successful");
      return data;
    } else {
      if (response.status === 400) {
        toast.error("Invalid email or password");
      } else {
        toast.error("Unable to connect to the server");
      }
    }
  } catch (error) {
    console.error("An error occurred during login:", error);
    toast.error("An error occurred during login");
  }
}

export function getLocal() {
  return localStorage.getItem("authToken");
}
