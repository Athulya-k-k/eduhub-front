import { button } from '@material-tailwind/react';
import React from 'react'

const Pagination = ({ totalPosts, postsPerPage, setCurrentPage, currentPage}) => {
    let pages= [];
    for(let i=1 ;i<=Math.ceil(totalPosts/postsPerPage);i++){
        pages.push(i)
    }
  return (
    <div>
      {pages.map((page,index)=>{
        return   <button className=' w-9 h-9 mb-7 font-semibold text-base mx-2 rounded-md transition-all duration-300 bg-transparent  border  border-gray-900 bg-gray-500 text-gray-900'  key={index} onClick={()=> setCurrentPage(page)}>{page}</button>;
      })}
    </div>
  )
}

export default Pagination
