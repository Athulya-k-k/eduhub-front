import React, { useState, useEffect } from 'react';
import NavBar from '../navbar/Navbar';
import jwtDecode from 'jwt-decode';
import { getLocal } from '../../../helpers/auth';
import instance from '../../../utils/axios';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

export default function Checkout() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [orderId, setOrderId] = useState('');

  const userAuth = getLocal('authToken');
  let user_name;
  if (userAuth) {
    user_name = jwtDecode(userAuth);
  }

  useEffect(() => {
    getCart();
  }, []);

  async function getCart() {
    const cart_response = await instance.get(`cart/getcarts/${user_name.user_id}`);
    const cartItems = cart_response.data.data;
    setCart(cartItems);
    calculateSubtotal(cartItems);
  }

  // Calculate the subtotal price
  function calculateSubtotal(cartItems) {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.course.price;
    });
    setSubtotal(total);
  }

  const handlePaymentSuccess = async (response) => {
    try {
      const bodyData = new FormData();
      bodyData.append('response', JSON.stringify(response));
      bodyData.append('user', user_name.user_id);

      const res = await instance.post(`payment/success/`, bodyData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      console.log('Everything is OK!');
      console.log(res.data.order_id);
      navigate('/mylearning');
    } catch (error) {
      console.error(error);
    }
  };


  const loadScript = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
  };

  const showRazorpay = async () => {
   

    const res = await loadScript();

    let bodyData = new FormData();

    // we will pass the amount and product name to the backend using form data

    bodyData.append("amount", subtotal);
    bodyData.append("user", user_name.user_id);
   

    const data = await instance({
      url: `payment/pay/`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: bodyData,
    }).then((res) => {
      return res;
    });

    // in data we will receive an object from the backend with the information about the payment
    //that has been made by the user

    const REACT_APP_PUBLIC_KEY = process.env.REACT_APP_PUBLIC_KEY
    const REACT_APP_SECRET_KEY = process.env.REACT_APP_SECRET_KEY
    
    var options = {
      key_id: REACT_APP_PUBLIC_KEY, // in react your environment variable must start with REACT_APP_
      key_secret: REACT_APP_SECRET_KEY,
      amount: data.data.payment.amount,
      currency: "INR",
      name: "EduHub",
      description: "Test teansaction",
      image: "", // add image url
      order_id: data.data.payment.id,
      
      handler: function (response) {
        // we will handle success by calling handlePaymentSuccess method and
        // will pass the response that we've got from razorpay
        handlePaymentSuccess(response);
      },
      prefill: {
        name: "User's name",
        email: "User's email",
        contact: "User's phone",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  
  };








  return (
    <div className="w-full h-full font-poppins relative">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full h-80 bg-cover ">
        <NavBar />
        <div className="w-full py-10 mt-10 flex flex-col place-content-center place-items-center">
          <div className="w-4/5 ">
            <h2 className="text-4xl font-semibold underline-offset-1 text-black ">Checkout</h2>
          
          </div>
        </div>
      </div>
      <div className="w-full pl-5 pr-5 absolute top-60 py-5 px-2 flex place-content-between place-items-center gap-10">
      <div className="w-full pl-5 pr-5 absolute top-1/2 transform -translate-y-1/2 flex flex-col items-center justify-center">
  <div className="w-72 p-5 rounded-xl  mt-60 flex flex-col gap-5 shadow-xl">
          <h1 className='text-md font-semibold underline font-poppins'>Cart Total</h1>
          {
            cart?.map((item) => (
              <div className='w-full flex place-content-between border-b-2 border-gray-200 gap-3 py-1' key={item.course.id}>
                <p className='w-3/5 text-sm'>{item.course.title}</p>
                <p>₹ {item.course.price}</p>
              </div>
            ))
          }
          <div className='w-full flex gap-2 place-content-between'>
            <p className='text-xl font-semibold'>Sub Total:</p>
            <p className='font-semibold'>₹ {subtotal}</p>
          </div>
          <Link className='h-11 rounded-xl place-items-center bg-cards text-center text-black font-semibold'>
            <button onClick={showRazorpay} className='bg-teal-700 px-3 py-2 rounded-lg text-black font-semibold'>Pay Now</button>
          </Link>
       
           
          </div>
        </div>
     
      </div>
    </div>
  );
}
