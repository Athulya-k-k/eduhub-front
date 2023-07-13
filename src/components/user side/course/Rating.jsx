import React from 'react'
import { useState,useEffect } from 'react';
import { Textarea } from '@material-tailwind/react'
import { AiOutlineCloseCircle } from 'react-icons/ai';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import instance from '../../../utils/axios';
import jwtDecode from 'jwt-decode';
import { getLocal } from '../../../helpers/auth';
import { useParams } from 'react-router-dom'


export default function Rating() {
    const [write,setWrite] = useState(false);
    const [review,setReview]= useState({desc:"",rating:1});
    const [error,setError] = useState(null);
    const [reviews,Setreviews] = useState([])

    const { id } = useParams(); 


    useEffect(() => {
        getReview();
    }, [])

    async function getReview() {

        const review_response = await instance.get(`learning/getreview/${id}`)
        Setreviews(review_response.data)
    }

    
    const user_auth = getLocal('authToken');
    let user_name;
    if(user_auth){
      user_name = jwtDecode(user_auth)
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
    
        const form = new FormData()
        form.append('rating', review.rating)
        form.append('discription', review.desc)
        form.append('user', user_name.user_id)
        form.append('course',id)
    
        const res = await instance({
          method: 'post',
          url: `learning/addreview/`,
          data: form
        })
        if (res.status === 200) {
          setWrite(false);
        } else {
          toast.error(res.statusText)
        }
      } 



  return (
    <div className="w-full shadow-lg p-5 mb-4   h-24 rounded-xl">
        <div className="w-full px-5 bg-white p-4 flex h-auto gap-3 place-items-center place-content-between">
            <h3 className='flex gap-3 font-semibold'>Total Average : <span className='font-normal'>3.5/5</span></h3>
            <h3 className='flex gap-3 font-semibold'>Total Reviews : <span className='font-normal'>{reviews.length}</span></h3>
            <div>
                {
                    <button className='border-2 border-gray-400 text-gray-700 px-5 py-2 text-md font-normal' onClick={()=>setWrite(true)}>Write Review</button>
                }
                
            </div>
        </div>

        
        
        {
        write &&
        <div className='w-full h-full absolute top-0 bg-black bg-opacity-5 flex flex-col place-content-center place-items-center'> 
            <div className="bg-white w-3/5 p-5 rounded-md gap-3 flex flex-col">
                <div className="flex place-content-end">
                    <AiOutlineCloseCircle size={20} className=' cursor-pointer' onClick={()=>{setWrite(false)}}></AiOutlineCloseCircle>
                </div>
                <h1 className='text-center font-semibold text-lg'>Write Review</h1>
                <form className='flex flex-col gap-6' onSubmit={e => handleSubmit(e)}>
                   
                    <div className="rating">
                        <h2 className='pe-1'>Rate</h2>
                        <input type="radio" name="rating-2" value="1" onChange={(e)=>setReview({...review,rating:e.target.value})}  className="mask mask-star-2  bg-orange-400" />
                        <input type="radio" name="rating-2" value="2" onChange={(e)=>setReview({...review,rating:e.target.value})}  className="mask mask-star-2 bg-orange-400"/>
                        <input type="radio" name="rating-2" value="3" onChange={(e)=>setReview({...review,rating:e.target.value})}  className="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating-2" value="4" onChange={(e)=>setReview({...review,rating:e.target.value})}  className="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating-2" value="5" onChange={(e)=>setReview({...review,rating:e.target.value})}  className="mask mask-star-2 bg-orange-400" />
                    </div>
                    <div className="flex flex-col">
                        <Textarea label='Write your review' onChange={(e)=>setReview({...review,desc:e.target.value})} name='review' color='gray' placeholder='Enter your review about this course' variant="static"/>

                        {
                            error?.desc &&
                            <p className='text-red-500 text-sm text-start'>{error?.desc}</p>
                        }

                    </div>
                    
                    <button className='bg-black text-white px-5 py-2' type='submit'>Submit</button>
                </form>
            </div>
        </div>
        }





    </div>
  )
}
