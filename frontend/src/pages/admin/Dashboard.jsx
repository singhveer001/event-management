import React from 'react'
import EventCard from '../../components/admin/EventCard'
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleCreateEventClick = () => {
    navigate("/dashboard/create-event");
  };

  return (
    <div className=''>
      <div className='flex justify-between px-4 mt-4'>
        <h3  className='text-2xl font-semibold p-2'>Events</h3>
        <div onClick={handleCreateEventClick} className='border-2 border-slate-400 p-2 rounded-lg text-md font-normal cursor-pointer'>
          Create Event
        </div>
      </div>

      {/* Responsive grid layout */}
      <div className='mt-3 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 lg:gap-10'>
        <EventCard
          src="https://images.pexels.com/photos/27495515/pexels-photo-27495515/free-photo-of-a-woman-in-a-white-dress-walking-in-front-of-hot-air-balloons.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" 
          eventName="UI/UX EVENT"
        />
        <EventCard
          src="https://images.pexels.com/photos/27495515/pexels-photo-27495515/free-photo-of-a-woman-in-a-white-dress-walking-in-front-of-hot-air-balloons.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" 
          eventName="UI/UX EVENT"
        />
        <EventCard
          src="https://images.pexels.com/photos/27495515/pexels-photo-27495515/free-photo-of-a-woman-in-a-white-dress-walking-in-front-of-hot-air-balloons.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" 
          eventName="UI/UX EVENT"
        />
        <EventCard
          src="https://images.pexels.com/photos/27495515/pexels-photo-27495515/free-photo-of-a-woman-in-a-white-dress-walking-in-front-of-hot-air-balloons.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" 
          eventName="UI/UX EVENT"
        />
        <EventCard
          src="https://images.pexels.com/photos/27495515/pexels-photo-27495515/free-photo-of-a-woman-in-a-white-dress-walking-in-front-of-hot-air-balloons.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" 
          eventName="UI/UX EVENT"
        />
        <EventCard
          src="https://images.pexels.com/photos/27495515/pexels-photo-27495515/free-photo-of-a-woman-in-a-white-dress-walking-in-front-of-hot-air-balloons.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" 
          eventName="UI/UX EVENT"
        />
        <EventCard
          src="https://images.pexels.com/photos/27495515/pexels-photo-27495515/free-photo-of-a-woman-in-a-white-dress-walking-in-front-of-hot-air-balloons.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" 
          eventName="UI/UX EVENT"
        />
      </div>
    </div>
  )
}

export default Dashboard
