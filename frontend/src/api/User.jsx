import React from 'react'
import axios from 'axios';
export const userSignup =async (body) => {
    const response =await axios.post("http://localhost:5000/api/user/signup", body);
    return response
}

