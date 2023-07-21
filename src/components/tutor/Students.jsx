import React from "react";
import Sidebar from "./Sidebar";
import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import instance from "../../utils/axios";
import Pagination from "../Pagination";
import { AiOutlineMessage } from "react-icons/ai";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";

function Student() {
  const [student, setStudent] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [msgData, setMsgData] = useState({
    msg_text: "",
  });
  const[succeMsg,setsuccessMsg]=useState('');
  const[errorMsg,seterrorMSg]=useState('')
  const tutorId=localStorage.getItem('tutorId')
  const tutor=localStorage.getItem('tutor')

  const handleOpen = () => setOpen(!open);

  const handleChange = (event) => {
    setMsgData({
      ...msgData,
      [event.target.name]: event.target.value,
    });
  };

  const formSubmit = (user_id) => {
    const formData = new FormData();
    formData.append("msg_text", msgData.msg_text);
    formData.append("msg_from", tutor);
    try {
      instance
        .post(`msg/send-message/${tutorId}/${user_id}`, formData)
        .then((res) => {
          if (res.data.bool==true) {
            setsuccessMsg(res.data.msg);
            seterrorMSg('')
          }else{
            setsuccessMsg('')
            seterrorMSg(res.data.msg)
          }
          
          
        });
    } catch (error) {
      console.log(error);
    }
  };

  async function getStudent() {
    const response = await instance.get("api/users/");
    setStudent(response.data);
  }

  useEffect(() => {
    getStudent();
  }, []);

  const statusChange = (id) => {
    instance.get(`api/blockuser/${id}`).then(() => getStudent());
  };

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentStudents = student.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="flex h-full bg-acontent">
      <Sidebar />
      <div className="px-5 w-full h-auto min-h-screen mx-5 mt-2  py-8 font-poppins flex flex-col place-content-start place-items-center bg-white shadow-xl rounded-xl">
        <div className="w-full h-screen px-3 font-poppins">
          <Toaster position="top-center" reverseOrder={false}></Toaster>
        
          <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-4 font-large text-gray-900">
                    Student Name
                  </th>
                  <th scope="col" className="px-6 py-4 font-large text-gray-900">
                    Email
                  </th>
                  {/* <th scope="col" className="px-6 py-4 font-large text-gray-900">
                    Chat
                  </th> */}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                {currentStudents.map((user, index) => (
                  <tr className="hover:bg-gray-50" key={index}>
                    <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                      <div className="relative h-10 w-10">
                        <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
                      </div>
                      <div className="text-sm">
                        <div className="font-medium text-gray-700">{`${user.first_name} ${user.last_name}`}</div>
                        <div className="text-gray-400">{user.email}</div>
                      </div>
                    </th>
                    <td className="px-6 py-4">
                      <p>{user.email}</p>
                    </td>
                    {/* <td className="px-6 py-4">
                    <button
  className="flex items-center justify-center"
  onClick={handleOpen}
>
  <AiOutlineMessage size={20} />
  <span className="ml-2">chat</span>
</button>
                    </td> */}
                    <Dialog
                      open={open}
                      handler={handleOpen}
                      className="fixed inset-0 z-50 flex justify-center items-center"
                    >
                      <div className="bg-white w-full h-screen max-w-[600px] p-6 rounded-lg flex flex-col">
                        <div className="flex items-center justify-between">
                          <DialogHeader>Message to {user.first_name}</DialogHeader>
                          <XMarkIcon
                            className="mr-3 h-5 w-5"
                            onClick={handleOpen}
                          />
                        </div>
                        <DialogBody divider className="flex-grow">
                          <div className="grid gap-6 grid-cols-2">
                            <div className="w-5/12 ml-auto">
                              <div className="bg-blue-500 text-white text-left">
                                <p>asdfghjk</p>
                              </div>
                              <small className="text-muted">22-07-2022 10:30</small>
                            </div>
                            <div>
                              <DialogBody divider>
                                <div className="grid gap-6">
                                  <Input
                                    onChange={handleChange}
                                    label="Username"
                                  />
                                  <Button
                                    className="h-9 w-28"
                                    color="green"
                                   
                                  >
                                    Send
                                  </Button>
                                </div>
                              </DialogBody>
                            </div>
                          </div>
                        </DialogBody>
                      </div>
                    </Dialog>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            totalPosts={student.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default Student;
