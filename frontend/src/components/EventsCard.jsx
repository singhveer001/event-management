import React from "react";
import { Button } from "./Button";

const EventsCard = ({eventName,details,btnName,imgUrl,onClick, disabled}) => {
  return (
    <div className="px-4 py-6 bg-slate-50 flex flex-col md:flex-row justify-between gap-8 w-full h-auto rounded-md mb-10">

      <div className="relative w-full sm:w-full md:w-1/2 xl:w-2/5 h-64  md:h-auto">
        <img
          className="w-full h-full object-cover rounded-md"
          src={imgUrl}
          alt="Card"
        />
      </div>

      <div className="flex flex-col justify-between w-full">
        <div className="w-full">
          <h3 className="text-slate-900 font-serif font-bold text-xl md:text-2xl mb-4">
            {eventName}
          </h3>
          <p className="text-slate-600 text-md md:text-lg mb-3">
              {details}
          </p>
        </div>
        <div className="w-full md:w-40 ">
          <Button onClick={onClick} label={btnName} disabled={disabled} />
        </div>
      </div>
    </div>
  );
};

export default EventsCard;
