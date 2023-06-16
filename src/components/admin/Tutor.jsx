import React from 'react'
import Sidebar from './Sidebar'
import { Toaster } from 'react-hot-toast'
import { useState,useEffect } from 'react'
import instance from '../../utils/axios'
import Pagination from '../Pagination'

function Tutor() {

  const [tutor, setTutor] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] =useState(5)
    async function getTutor() {
        const response = await instance.get('tutor/tutors/')
        setTutor(response.data)
    }

    useEffect(()=>{
        getTutor();
    }, [])


    // const statusChange = (id) => {
    //     // console.log('user id', id)
    //     axios.get(`${BASE_URL}/api/blocktutor/${id}`)
    //     .then(()=>getTutor())
    //     // console.log(response);
    // }


    // console.log(tutor)
    const lastPostIndex =currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentTutors = tutor.slice(firstPostIndex,lastPostIndex);
  
  return (
    <div className='flex h-full bg-acontent'>
        <Sidebar/>
      <div className='px-5 w-full h-auto min-h-screen mx-5 mt-2  py-8 font-poppins flex flex-col place-content-start place-items-center bg-white shadow-xl rounded-xl'>
        <div className='w-full h-screen px-3 font-poppins'>
        <Toaster position='top-center' reverseOrder='false' ></Toaster>
       
        <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead class="bg-gray-50">
            <tr>
              
                <th scope="col" class="px-6 py-4 font-large text-gray-900">subject</th>
                <th scope="col" class="px-6 py-4 font-large text-gray-900">qualification</th>
                <th scope="col" class="px-6 py-4 font-large text-gray-900">experience</th>
                {/* <th scope="col" class="px-6 py-4 font-large text-gray-900">status</th>
                <th scope="col" class="px-6 py-4 font-large text-gray-900">action</th> */}
                
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 border-t border-gray-100">
                {
                 currentTutors.map((tutor,index)=>(
                        <tr class="hover:bg-gray-50" key={index}>
                            <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
                           
                            { <div class="text-sm">
                                <div class="font-medium text-gray-700">{`${tutor.subject}`}</div>
                               
                              
                             </div> }
                             </th>
                            <td class="px-6 py-4">
                                <p>{tutor.qualification}</p>
                            </td>
                            <td class="px-6 py-4">
                                <p>{tutor.experience}</p>
                            </td>
                           
                            {/* <td class="px-6 py-4">
                                {tutor.is_active ?
                                <span class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                                    <span class="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                                        Active
                                </span>
                                :
                                <span class="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                                    <span class="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                                        Blocked
                                </span>
                                }
                            </td> */}

                            <td class="px-6 py-4">
                            <div className="flex">
                                <label class="inline-flex relative items-center mr-5 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={!tutor.is_active}
                                        readOnly
                                    />
                                    {/* <div
                                        onClick={() => statusChange(tutor.id)}
                                        className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                                    ></div>
                                    {tutor.is_active ? 
                                        <span className="ml-2 text-sm font-medium text-gray-900">
                                            Block
                                        </span>
                                        :
                                        <span className="ml-2 text-sm font-medium text-gray-900">
                                            Unblock
                                        </span>
                                    } */}
                                    
                                </label>
                            </div>
                        </td>
                        </tr>
                    ))
                }
            
          
            </tbody>
        </table>
        </div>
        <Pagination totalPosts={tutor.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
    </div>
    </div>
    </div>
  )
}

export default Tutor