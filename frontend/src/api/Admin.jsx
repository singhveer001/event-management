import React, { useEffect, useState } from 'react'
import axios from 'axios';
export const adminSignup = async (body) => {
    const response =await axios.post("http://localhost:5000/api/admin/signup", body);
    return response
}

export const adminSignin = async (body) => {
    const response = await axios.post("http://localhost:5000/api/admin/signin", body);
    return response
}

export const useAdminEventList = () => {
    const token = localStorage.getItem("token");
    const [data,setData] = useState({events:[], loading: true, error: ''});
    useEffect( () => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/events/admin-event-list", {
                    headers: {
                        Authorization : `Bearer ${token}`
                    }
                })
                setData({events: res.data, loading: false, error:""})
            } catch (error) {
                setData({events: [], loading: false , error: "Error fetching user data"});
            }          
        }
        if( token ) fetchData();
    },[token])
    return data;
};

export const createEvent = async (body) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("data",JSON.stringify({
        name : body.eventTitle,
        description: body.eventDesc,
        detail: body.eventDetail,
        location: body.eventLocation,
        date: body.eventDate
        })
    )
    if(body.eventImg){
        formData.append("myFile",  body.eventImg)
    }
    const res = await axios.post("http://localhost:5000/api/events/create",formData,
        {
            headers : {
                Authorization : `Bearer ${token}`,
                "Content-Type":"multipart/form-data"
            }
        }
    )
    return res.data;
}