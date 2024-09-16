import React from "react";
import Navbar from "../../components/Navbar";
import EventsCard from "../../components/EventsCard";

const Events = () => {
  return (
    <div className="bg-slate-200 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-56 my-8">
        <EventsCard />
        <EventsCard />
        <EventsCard />
      </div>
    </div>
  );
};

export default Events;
