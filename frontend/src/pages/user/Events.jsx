import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import EventsCard from "../../components/EventsCard";
import { allEvent, bookEvent } from "../../api/User";

const Events = () => {

  const [events, setEvents] = useState([]);
  useEffect(() => {
    allEvent({search:"", limit:10, offset:10})
      .then((res) => {
        setEvents(res.data);
      })
  },[])

  function handleBookEvent(eventId){
    bookEvent(eventId);
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
