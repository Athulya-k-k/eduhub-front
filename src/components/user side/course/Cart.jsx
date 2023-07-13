import React from 'react'
import NavBar from '../navbar/Navbar'
import { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { AiOutlineCloseSquare } from 'react-icons/ai';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../../utils/axios';
import jwtDecode from 'jwt-decode';
import { getLocal } from '../../../helpers/auth';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import { details } from '../../../utils/axios';


export default function Cart() {
    const [Cart, setCart] = useState([])
    const [total, setTotal] = useState('')
    
    const user_auth = getLocal('authToken');
    let user_name;
    if(user_auth){
      user_name = jwtDecode(user_auth)
    }




    useEffect(() => {
        getCart();
    }, [])


    async function getCart() {
        if(user_name){
            const cart_response = await axios.get(`${BASE_URL}cart/getcarts/${user_name.user_id}`)
            setCart(cart_response.data.data)
            setTotal(cart_response.data.total)
        }
        else{
            setCart('')
            setTotal('')
        }
    }

    function deleteItem(id){
            Swal.fire({
                title: 'Are you sure?',
                text: "Remove Item From Cart!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`${BASE_URL}cart/removecart/${id}`).then(
                        getCart()
                    )
                    getCart()
                    toast.success("Removed")
                }
              })
        }

 


  return (
    <div className='w-full h-full font-poppins relative'>
        <Toaster position='top-center' reverseOrder='false' ></Toaster>
        <div className="w-full h-80 bg-cover bg-white">
            <NavBar/>
            <div className="w-full py-10  flex flex-col place-content-center place-items-center">
                <div className="w-4/5">
                    <h2 className='text-3xl font-semibold text-black '>Shopping Cart</h2>
                </div>
            </div>
        </div>
        {
            Cart?.length>0?
        <div className="w-full pl-5 pr-5 absolute top-60 py-5 px-2 flex place-content-between place-items-center gap-10">
            <div className="w-4/5 flex flex-col gap-8 pr-8 px-3">
            {

                Cart?.map((item)=>(

                <div className="w-full bg-white shadow-xl rounded-xl flex gap-6 place-items-center place-content-start p-3">
                    <div className="w-40">
                        <img  className='rounded-md'  src={`${details+item.course.image}`} alt="product_image" />
                    </div>
                    <div className='flex flex-2 flex-col place-content-start gap-5'>
                        <h2 className='text-2xl font-semibold font-poppins'>{item.course.title}</h2>
                        <div className="w-full flex gap-5 place-items-center">
                            <img className='w-10 h-10 rounded-xl' src="/avatar1.avif" alt="tutor_profile" />
                            <p>Athulya</p>
                        </div>
                        <div>
                            <p className='text-md text-gray-600 font-poppins'> Lectures</p>
                        </div>
                    </div>
                    <div className="flex flex-1 gap-3 place-content-center place-items-center">
                        <div className='w-full flex flex-col gap-1'>
                            
                            <h3 className='text-lg font-semibold text-gray-600 '>₹ {item.course.price}</h3>
                        </div>
                        <div>
                            <AiOutlineCloseSquare size={25} className='text-red-600 cursor-pointer' onClick={()=>deleteItem(item.id)}></AiOutlineCloseSquare>
                        </div>
                    </div>
                </div>
            ))
            }
            </div>
            <div className="w-1/5 p-5 rounded-lg top-0 mr-6 h- mt-5 right-0 absolute bg-white flex flex-col gap-5 shadow-xl">
                <h1 className='text-md font-semibold font-poppins'>Cart Total</h1>
                {
                    Cart?.map((item)=>(
                        <div className='w-full flex place-content-between border-b-2 border-gray-200 gap-3 py-1'>
                            <p className='w-3/5 text-sm'>{item.course.title}</p>
                            <p>₹ {item.course.price}</p>
                        </div>
                    ))
                }
            

               

                <div className='w-full flex gap-2 place-content-between'>
                    <p className='text-xl font-semibold '>Sub Total : </p>
                    <p className='font-semibold'>₹ {total}</p>
                </div>
                

                <Link to="/payment" className=' h-11 rounded-xl place-items-center bg-cards text-center text-black font-semibold'><button className='bg-darkPink px-3 py-2 text-black font-semibold'>Checkout</button></Link>
            </div>
            
             
            </div>
            :
                <div className="w-full pl-5 pr-5 absolute top-60 py-5 px-2 flex flex-col place-items-center gap-10">
                    <div className='w-full bg-white shadow-xl rounded-xl flex flex-col place-items-center place-content-start p-3'>
                        <img className='w-80 h-80 pb-6' src="/empty-cart.gif" alt="" />
                        <p className='font-poppins text-3xl font-semibold'>Cart is empty</p>
                    </div>
                </div>
            
            }
    </div>
  )
}
