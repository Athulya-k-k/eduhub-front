import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Toaster } from "react-hot-toast";
import instance from "../../utils/axios";
import Pagination from "../Pagination";
import { Switch } from "@material-tailwind/react";

function Tutor() {
  const [tutors, setTutors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  async function getTutors() {
    const response = await instance.get("api-tutor/tutor/");
    setTutors(response.data);
  }

  useEffect(() => {
    async function getTutors() {
      try {
        const response = await instance.get("api-tutor/tutor/");
        setTutors(response.data);
      } catch (error) {}
    }
    getTutors();
  }, []);

  const statusChange = (tutorId) => {
    // console.log('user id', id)
    instance.put(`api-tutor/block/${tutorId}/`).then(() => getTutors());
    // console.log(response);
  };

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentTutors = tutors.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="flex h-full bg-acontent">
      <Sidebar />
      <div className="px-5 w-full h-auto min-h-screen mx-5 mt-2 py-8 font-poppins flex flex-col place-content-start place-items-center bg-white shadow-xl rounded-xl">
        <div className="w-full h-screen px-3 font-poppins">
          <Toaster position="top-center" reverseOrder={false} />

          <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 font-large text-gray-900"
                  >
                    fullName
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-large text-gray-900"
                  >
                    email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-large text-gray-900"
                  >
                    qualification
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-large text-gray-900"
                  >
                    skills
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-large text-gray-900"
                  >
                    mobile number
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-large text-gray-900"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                 {currentTutors.map((tutor, index) => (
                  <tr className="hover:bg-gray-50" key={index}>
                    <td className="px-6 py-4">{tutor.full_name}</td>
                    <td className="px-6 py-4">{tutor.email}</td>
                    <td className="px-6 py-4">{tutor.qualification}</td>
                    <td className="px-6 py-4">{tutor.skills}</td>
                    <td className="px-6 py-4">{tutor.mobile_no}</td>
                    <td class="px-6 py-4">
                      {tutor.is_active ? (
                        <span class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                          <span class="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                          Active
                        </span>
                      ) : (
                        <span class="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                          <span class="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                          Blocked
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <td class="px-6 py-4">
                        <div className="flex">
                          <label class="inline-flex relative items-center mr-5 cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={!tutor.is_active}
                              readOnly
                            />
                            <div
                              onClick={() => statusChange(tutor.id)}
                              className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                            ></div>
                            {tutor.is_active ? (
                              <span className="ml-2 text-sm font-medium text-gray-900">
                                Block
                              </span>
                            ) : (
                              <span className="ml-2 text-sm font-medium text-gray-900">
                                Unblock
                              </span>
                            )}
                          </label>
                        </div>
                      </td>
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
