import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import EventsCard from "../../components/EventsCard";
import { allEvent, bookEvent } from "../../api/User";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    allEvent({search:"", limit:10, offset:0})
      .then((res) => {
        setEvents(res.data);
      })
  },[])

  function handleBookEvent(eventId){
    const token = localStorage.getItem('token');
    if(token !== null){
      bookEvent(eventId);
    }else{
      navigate('/signin')
    }
  }

  return (
    <div className="bg-slate-200 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-56 my-8">
        {
          events.map((data) => {
            return <EventsCard 
              eventName={data.name}
              details={data.detail}
              imgUrl={data.image}
              btnName={"Book Now"}
              key={data._id}
              onClick = {() => handleBookEvent(data._id)}
            />
          })
        }
      </div>
    </div>
  );
};

export default Events;
