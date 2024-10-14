import React from "react";
import Navbar from "../../components/Navbar";
import Section from "../../components/Section";
import Card from "../../components/Card";
import { Link } from "react-router-dom";

const Home = () => {
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
            <Card
              eventName={"UI/UX Event"}
              details="The place is close to Barceloneta Beach and bus stop just 2 min by
          walk and near to Naviglio where you can enjoy the main night life in Barcelona."
              src="https://images.pexels.com/photos/2716728/pexels-photo-2716728.jpeg?auto=compress&cs=tinysrgb&w=600"
            />
            <Card
              eventName={"UI/UX Event"}
              details="The place is close to Barceloneta Beach and bus stop just 2 min by
          walk and near to Naviglio where you can enjoy the main night life in Barcelona."
              src="https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=600"
            />
            <Card
              eventName={"UI/UX Event"}
              details="The place is close to Barceloneta Beach and bus stop just 2 min by
          walk and near to Naviglio where you can enjoy the main night life in Barcelona."
              src="https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=600"
            />
            <Card
              eventName={"UI/UX Event"}
              details="The place is close to Barceloneta Beach and bus stop just 2 min by
          walk and near to Naviglio where you can enjoy the main night life in Barcelona."
              src="https://images.pexels.com/photos/787961/pexels-photo-787961.jpeg?auto=compress&cs=tinysrgb&w=600"
            />
            <Card
              eventName={"UI/UX Event"}
              details="The place is close to Barceloneta Beach and bus stop just 2 min by
          walk and near to Naviglio where you can enjoy the main night life in Barcelona."
              src="https://images.pexels.com/photos/274192/pexels-photo-274192.jpeg?auto=compress&cs=tinysrgb&w=600"
            />
            <Card
              eventName={"UI/UX Event"}
              details="The place is close to Barceloneta Beach and bus stop just 2 min by
          walk and near to Naviglio where you can enjoy the main night life in Barcelona."
              src="https://images.pexels.com/photos/2403753/pexels-photo-2403753.jpeg?auto=compress&cs=tinysrgb&w=600"
            />
            <Card
              eventName={"UI/UX Event"}
              details="The place is close to Barceloneta Beach and bus stop just 2 min by
          walk and near to Naviglio where you can enjoy the main night life in Barcelona."
              src="https://images.pexels.com/photos/2716728/pexels-photo-2716728.jpeg?auto=compress&cs=tinysrgb&w=600"
            />
            <Card
              eventName={"UI/UX Event"}
              details="The place is close to Barceloneta Beach and bus stop just 2 min by
          walk and near to Naviglio where you can enjoy the main night life in Barcelona."
              src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
            />
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
