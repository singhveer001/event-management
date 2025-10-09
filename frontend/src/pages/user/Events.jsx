import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import EventsCard from "../../components/EventsCard";
import { allEvent, bookEvent, userBookedEvent } from "../../api/User";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [bookedEvent, setBookedEvent] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    allEvent({search:"", limit:10, offset:0})
      .then((res) => {
        setEvents(res.data);
      })
  },[])

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if(token){
      userBookedEvent().then((res) => {
        setBookedEvent(res);
      })
    }
  },[])

  async function handleBookEvent(eventId){
    const token = localStorage.getItem('userToken');
    if(!token){
          navigate('/signin')
          return;
        }
    
    try {
      await bookEvent(eventId);
      setBookedEvent((prev) => [...prev, {_id: eventId}] )
    } catch (error) {
      console.error(error);
    }
  }

  const isEventBooked = (eventId) => {
    return bookedEvent.some( (event) => event._id === eventId)
  }
  return (
    <div className="bg-slate-200 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-56 my-8">
        {
          events.map((data) => {
            const booked = isEventBooked(data._id)
            return <EventsCard 
              eventName={data.name}
              details={data.detail}
              imgUrl={data.image}
              btnName={booked ? "Booked" : "Book Now"}
              key={data._id}
              onClick = {() => !booked && handleBookEvent(data._id)}
              disabled={booked}
            />
          })
        }
      </div>
    </div>
  );
};

export default Events;
