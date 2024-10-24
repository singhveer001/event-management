import React from "react";
import PropTypes from "prop-types";
import { FaEdit } from "react-icons/fa";

const EventCard = (props) => {
  return (
    <div className="w-full overflow-hidden shadow-lg bg-white">
      <div className="relative h-60">
        <img
          className="w-full h-full object-cover"
          src={props.src}
          alt={props.eventName || "Event Image"}
        />
        <button className="absolute top-2 right-2 rounded-full p-1 shadow bg-slate-100 hover:bg-gray-200">
          <FaEdit className="h-5 w-5" />
        </button>
      </div>
      <div className="px-6 py-2">
        <div className="font-bold text-xl mb-2">{props.eventName}</div>
        <p className="text-gray-700 text-base">{props.details}</p>
        <p className="text-gray-400 text-sm">Aug 20, 2024</p>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  src: PropTypes.string.isRequired,
  eventName: PropTypes.string.isRequired,
  details: PropTypes.string,
};

export default EventCard;
