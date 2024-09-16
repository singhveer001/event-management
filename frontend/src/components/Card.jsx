import React from "react";

const Card = (props) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg mb-20">
      <div className="relative h-50">
        <img
          className="w-full h-full object-cover rounded-md"
          src={props.src}
          alt="Card"
        />
      </div>
      <div className="px-6 py-2">
        <div className="font-bold text-xl mb-2">UI/UX Event</div>
        <p className="text-gray-700 text-base">{props.details}</p>
      </div>
      <div className="px-6 py-2">
        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default Card;
