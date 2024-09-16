import React from "react";
import image from "../assets/pixabay.jpg";

const Section = () => {
  return (
    <div className="relative h-full shadow-lg">
      <img
        className="w-full h-full object-cover"
        src={image}
        alt="section background"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-600 to-slate-800 opacity-40"></div>

      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Manage your events seamlessly and effortlessly
          </h2>
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            with our all-in-one event management system
          </h2>
      </div>

    </div>
  );
};

export default Section;
