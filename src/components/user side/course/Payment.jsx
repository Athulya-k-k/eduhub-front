import React, { useState, useEffect } from 'react';
import NavBar from '../navbar/Navbar';
import jwtDecode from 'jwt-decode';
import { getLocal } from '../../../helpers/auth';
import { BASE_URL } from '../../../utils/axios';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

export default function Checkout() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
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
    const cart_response = await axios.get(`${BASE_URL}cart/getcarts/${user_name.user_id}`);
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

      const res = await axios.post(`${BASE_URL}payment/success/`, bodyData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      console.log('Everything is OK!');
      console.log(res.data.order_id);
      navigate('/');
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
    if (!fname || !lname || !address1 || !address2 || !email || !phone)
    {
      toast.error("pls fill all data")
    }
    else{


    const res = await loadScript();

    let bodyData = new FormData();

    // we will pass the amount and product name to the backend using form data

    bodyData.append("amount", subtotal);
    bodyData.append("user", user_name.user_id);
    bodyData.append("fname",fname)
    bodyData.append("lname",lname)
    bodyData.append("address1",address1)
    bodyData.append("address2",address2)
    bodyData.append("email",email)
    bodyData.append("phone",phone)

    const data = await axios({
      url: `${BASE_URL}payment/pay/`,
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

    const REACT_APP_PUBLIC_KEY = 'rzp_test_Lny9ufvQpupgij'
    const REACT_APP_SECRET_KEY = 'Ypbtz8V120wVBYxTaf5d3M6j'
    
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
  }
  };






//   const showRazorpay = async () => {
//     if (!fname || !lname || !address1 || !address2 || !email || !phone) {
//       toast.error('Please fill in all data');
//     } else {
//       const options = {
   

//         key: `rzp_test_Lny9ufvQpupgij`, // Replace with your Razorpay key
//         amount: subtotal * 100, // Multiply subtotal by 100 as Razorpay expects amount in paisa
//         currency: 'INR',
//         name: 'Eduhub',
//         description: 'Test transaction',
//         image: '', // Add image URL
//         order_id: ' data.data.payment.id', // Set dynamically based on response from backend
//         handler: function (response) {
//           handlePaymentSuccess(response);
//         },
//         prefill: {
//           name: 'User name',
//           email: 'User email',
//           contact: 'User phone',
//         },
//         notes: {
//           address: 'Razorpay Corporate Office',
//         },
//         theme: {
//           color: '#3399cc',
//         },
//       };

//       const res = await axios.post(`${BASE_URL}payment/pay/`, {
//         amount: subtotal,
//         user: user_name.user_id,
//         fname,
//         lname,
//         address1,
//         address2,
//         email,
//         phone,
//       }).then((res) => {
//         return res;
//       });
// // console.log(res);
//       // if (!res.data.success) {
//       //   console.error('Failed to generate Razorpay order ID');
//       //   return;
//       // }
//       if (res.data.success) {
//         setOrderId(res.data.orderId); 
//         options.order_id = res.data.orderId;
      


 
//       const rzp1 = new window.Razorpay(options);
//       rzp1.open();
//       }else {
//         console.error('Failed to generate Razorpay order ID');

//       }}
//   };

  return (
    <div className="w-full h-full font-poppins relative">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full h-80 bg-cover bg-white">
        <NavBar />
        <div className="w-full py-10 mt-10 flex flex-col place-content-center place-items-center">
          <div className="w-4/5">
            <h2 className="text-4xl font-semibold text-black ">Checkout</h2>
          </div>
        </div>
      </div>
      <div className="w-full pl-5 pr-5 absolute top-60 py-5 px-2 flex place-content-between place-items-center gap-10">
        <div className="w-4/6 flex flex-col ml-16 gap-8 pr-8 px-3">
          <div className="flex items-center bg-white w-full  rounded-2xl shadow-xl px-4 py-8">
            <form encType="multipart/form-data" className="font-poppins w-full gap-8 flex flex-col place-content-evenly place-items-center pb-10">
              <div className='flex w-3/4 py-3 justify-between'>
                <div className="flex  flex-col w-3/6 px-1">
                  <label htmlFor="first_name" className='py-3'>First Name</label>
                  <input type="first_name" name='first_name' className='border-b-2 border-gray-200 focus:border-primary px-5 py-2 focus:outline-none' onChange={e => setFname(e.target.value)} placeholder='Enter First Name'/>
                </div>
                <div className="flex flex-col w-3/6 px-1">
                  <label htmlFor="last_name" className='py-3'>Last Name</label>
                  <input type="last_name" name='last_name' className='border-b-2 border-gray-200 focus:border-primary px-5 py-2 focus:outline-none' onChange={e => setLname(e.target.value)} placeholder='Enter Last Name'/>
                </div>
              </div>
              <div className='flex w-3/4 py-3 justify-between'>
                <div className="flex  flex-col w-3/6 px-1">
                  <label htmlFor="first_name" className='py-3'>Address Line 1</label>
                  <input type="address1" name='address1' onChange={e => setAddress1(e.target.value)} className='border-b-2 border-gray-200 focus:border-primary px-5 py-2 focus:outline-none' placeholder='Enter Address 1'/>
                </div>
                <div className="flex flex-col w-3/6 px-1">
                  <label htmlFor="last_name" className='py-3'>Address Line 2</label>
                  <input type="address2" name='address2' className='border-b-2 border-gray-200 focus:border-primary px-5 py-2 focus:outline-none' onChange={e => setAddress2(e.target.value)} placeholder='Enter Address 2'/>
                </div>
              </div>
              <div  className='flex w-3/4 py-3 justify-between'>
                <div className="flex  flex-col w-3/6 px-1">
                  <label htmlFor="first_name" className='py-3'>Email Address</label>
                  <input type="first_name" name='first_name' className='border-b-2 border-gray-200 focus:border-primary px-5 py-2 focus:outline-none' onChange={e => setEmail(e.target.value)} placeholder='Enter Email Address'/>
                </div>
                <div className="flex flex-col w-3/6 px-1">
                  <label htmlFor="last_name" className='py-3'>Phone Number</label>
                  <input type="last_name" name='last_name' className='border-b-2 border-gray-200 focus:border-primary px-5 py-2 focus:outline-none' onChange={e => setPhone(e.target.value)} placeholder='Enter Phone Number'/>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="w-1/5 p-5 rounded-xl  top-0 mr-6 pb-10 mt-5 right-14 absolute bg-white flex flex-col gap-5 shadow-xl">
          <h1 className='text-md font-semibold font-poppins'>Cart Total</h1>
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
  );
}
