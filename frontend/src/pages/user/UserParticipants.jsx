import React from "react";
import Navbar from "../../components/Navbar";
import EventsCard from "../../components/EventsCard";
import { userBookedEvent } from "../../api/User";
import { useState } from "react";
import { useEffect } from "react";

const UserParticipants = () => {
  const [userEvents, setUserEvents] = useState([]);
  
  useEffect(() => {
    userBookedEvent().then((res) => {
      setUserEvents(res)
    })

  },[])

  return (
    <div className="bg-slate-200 min-h-screen flex flex-col">
      <Navbar />
      <div className="mt-8">
            <h2 className="text-3xl font-bold text-center mb-6">
              Events I'm Attending
            </h2>
          </div>
      <div className="flex-grow mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-56 my-8">
        {
          userEvents.map((res) => {
            return <EventsCard 
                key={res._id}
                eventName={res.name}
                details={res.detail}
                imgUrl= {res.image}
                btnName={"Booked"}
            />
          })
        }
      </div>
    </div>
  );
};

export default UserParticipants;
