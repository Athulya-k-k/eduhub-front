import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Toaster } from 'react-hot-toast';
import instance from '../../utils/axios';
import Pagination from '../Pagination';

function Tutor() {
  const [tutors, setTutors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  useEffect(() => {
    async function getTutors() {
      try {
        const response = await instance.get('tutor/tutors/');
        setTutors(response.data);
      } catch (error) {
        // Handle error
      }
    }
    getTutors();
  }, []);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentTutors = tutors.slice(firstPostIndex, lastPostIndex);

  const blockTutor = async (tutorId) => {
    try {
      await instance.put(`tutor/block/${tutorId}/`);
      // Perform necessary actions after successful blocking
    } catch (error) {
      // Handle error
    }
  };

  const unblockTutor = async (tutorId) => {
    try {
      await instance.put(`tutor/tutors/${tutorId}/unblock/`);
      // Perform necessary actions after successful unblocking
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div className='flex h-full bg-acontent'>
      <Sidebar />
      <div className='px-5 w-full h-auto min-h-screen mx-5 mt-2 py-8 font-poppins flex flex-col place-content-start place-items-center bg-white shadow-xl rounded-xl'>
        <div className='w-full h-screen px-3 font-poppins'>
          <Toaster position='top-center' reverseOrder={false} />

          <div className='overflow-hidden rounded-lg border border-gray-200 shadow-md m-5'>
            <table className='w-full border-collapse bg-white text-left text-sm text-gray-500'>
              <thead className='bg-gray-50'>
                <tr>
                  <th scope='col' className='px-6 py-4 font-large text-gray-900'>
                    Name
                  </th>
                  <th scope='col' className='px-6 py-4 font-large text-gray-900'>
                    Subject
                  </th>
                  <th scope='col' className='px-6 py-4 font-large text-gray-900'>
                    Qualification
                  </th>
                  <th scope='col' className='px-6 py-4 font-large text-gray-900'>
                    Experience
                  </th>
                  <th scope='col' className='px-6 py-4 font-large text-gray-900'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-100 border-t border-gray-100'>
                {currentTutors.map((tutor, index) => (
                  <tr className='hover:bg-gray-50' key={index}>
                    <td className='px-6 py-4'>{tutor.name}</td>
                    <td className='px-6 py-4'>{tutor.subject}</td>
                    <td className='px-6 py-4'>{tutor.qualification}</td>
                    <td className='px-6 py-4'>{tutor.experience}</td>
                    <td className='px-6 py-4'>
                      {tutor.is_active ? (
                        <button
                          className='block-btn'
                          onClick={() => blockTutor(tutor.id)}
                        >
                          Block
                        </button>
                      ) : (
                        <button
                          className='unblock-btn'
                          onClick={() => unblockTutor(tutor.id)}
                        >
                          Unblock
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            totalPosts={tutors.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default Tutor;
