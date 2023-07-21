import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { BASE_URL } from "../../utils/axios";
import axios from 'axios';
import login, { getLocal } from "../../helpers/auth";
import Loginimage from "../../images/login.png";
import jwt_decode from 'jwt-decode';
import { useEffect } from 'react';

function Chat() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
  <div className="h-5/6 w-10/12 flex flex-row bg-gray-500 rounded-3xl">
    <div className="h-full w-3/6 flex ml-12 mt-12 flex-col">
      <div className="w-5/12 ml-auto">
        <div className="bg-blue-500 text-white text-left">
          <p>asdfghjk</p>
        </div>
        <small className="text-muted">22-07-2022 10:30</small>
      </div>
      <div className="w-5/12 ml-auto">
        <div className="bg-blue-500 text-white text-left">
          <p>a</p>
        </div>
        <small className="text-muted">22-07-2022 10:30</small>
      </div>
    </div>
    <div className="h-full w-3/6 flex border-l border-gray-300">
      <h1 className="font-serif text-3xl text-custom-red ml-12 mt-12 font-bold">
        USER LOGIN
      </h1>
    </div>
  </div>
</div>

  
  );
}

export default Chat;
