import React from 'react'
import axios from 'axios';
export const adminSignup = async (body) => {
    const response =await axios.post("http://localhost:5000/api/admin/signup", body);
    return response
}



