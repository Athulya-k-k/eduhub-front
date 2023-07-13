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
