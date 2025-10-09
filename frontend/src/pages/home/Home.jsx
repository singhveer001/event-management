import React from "react";
import Navbar from "../../components/Navbar";
import Section from "../../components/Section";
import Card from "../../components/Card";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { allEvent, bookEvent, userBookedEvent } from "../../api/User";

const Home = () => {

  const [events, setEvents] = useState([]);
  const [bookedEvent, setBookedEvent] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    allEvent({limit:8, offSet:0})
      .then((res) => {
        setEvents(res.data)
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

  const handleBookEvent = async (eventId) => {
    const token = localStorage.getItem("userToken");
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
    <div className="overflow-x-hidden">
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>

      <main>
        <div className=" h-[calc(100vh-3rem)]">
          <Section />
        </div>

        <div className="container mx-auto mt-10 px-4 ">
          <div className="flex justify-between">
            <h2 className="text-3xl font-bold text-center mb-6">
              Our Featured Events
            </h2>
            <Link
              to="/event-list"
              className="animate-pulse	 text-md text-slate-900 text-center mb-6 	hover:bg-slate-700 hover:text-white rounded-full border-solid border-2 border-slate-600 px-3 py-1"
            >
              See More
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {
              events.map((data) => {
                const booked = isEventBooked(data._id);
                return <Card
                  const 
                  key={data._id}
                  eventName={data.name}
                  details={data.detail}
                  src={data.image}
                  onClick={() => !booked && handleBookEvent(data._id)}
                  disabled={booked}
                  text = {booked ? "Booked" : "Book Now"}
                />
              })
            }
          </div>
        </div>

        <div className="bg-blue-500 text-white py-12 mt-16 text-center">
          <h3 className="text-2xl font-bold">
            Don't miss out on our latest events!
          </h3>
          <button className="bg-white text-blue-500 mt-4 px-8 py-2 rounded-md font-bold">
            Book Your Slot Now
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;
