import axios from 'axios';
export const userSignup =async (body) => {
    const response =await axios.post("http://localhost:5000/api/user/signup", body);
    return response
}

export const userSignin = async (body) => {
    const response = await axios.post("http://localhost:5000/api/user/signin", body);
    return response;
}

export const allEvent = async ({search="", limit=10, offset=10}) => {
        const response = await axios.get("http://localhost:5000/api/user/event-list", {
            params : {search, limit, offset}
        })
        return response.data;
}

export const bookEvent = async (eventId) => {
    const token = localStorage.getItem('token');
    const userid = JSON.parse(localStorage.getItem('session')).id;
    console.log(userid)
    const response = await axios.post("http://localhost:5000/api/user/book-event",
        {
            userId : userid,
            eventId
        },
        {   headers:{ Authorization : `Bearer ${token}` } }
        )
    return response.data;
}

export const userBookedEvent = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:5000/api/events/user-booked-events",{
        headers:{
            Authorization : `Bearer ${token}`
        }
    })
    return response.data.Events;
}