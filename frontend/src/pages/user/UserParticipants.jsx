import React from "react";
import Navbar from "../../components/Navbar";
import EventsCard from "../../components/EventsCard";

const UserParticipants = () => {
  return (
    <div className="bg-slate-200 min-h-screen flex flex-col">
      <Navbar />
      <div className="mt-8">
            <h2 className="text-3xl font-bold text-center mb-6">
              Events I'm Attending
            </h2>
          </div>
      <div className="flex-grow mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-56 my-8">
      <EventsCard 
            eventName={"Hello from India"}
            details={`Personal trainer, nutritionist and wellness coach Rachael Sacerdoti
            shares how she stays feeling her best, even when motivation slips.`}
            btnName={"Booked"}
        />
        <EventsCard 
            eventName={"Hello from India"}
            details={`Personal trainer, nutritionist and wellness coach Rachael Sacerdoti
            shares how she stays feeling her best, even when motivation slips.`}
            btnName={"Booked"}
        />
        <EventsCard 
            eventName={"Hello from India"}
            details={`Personal trainer, nutritionist and wellness coach Rachael Sacerdoti
            shares how she stays feeling her best, even when motivation slips.`}
            btnName={"Booked"}
        />
      </div>
    </div>
  );
};

export default UserParticipants;
