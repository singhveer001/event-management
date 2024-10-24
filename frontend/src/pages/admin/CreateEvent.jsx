import React from "react";

const CreateEvent = () => {
  return (
    <div className="p-4">
        <div className="text-xl font-medium text-slate-500 border-b pb-2 mb-8">Create Event</div>
        <div className=" px-5 border  ">
            <div className="text-xl font-medium text-slate-500 border-b pb-2 mt-6">
                Event Information
            </div>
            <div className="grid xl:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 pt-6 gap-x-20">
                <div className="mb-3 ">
                    <h3 className="mb-3 text-xl font-normal  ">Add Image</h3>
                    <div className="border-4 cursor-pointer border-gray-200 h-80 text-gray-400 w-full flex items-center justify-center text-xl font-semibold">+Add Image</div>
                </div>
                <div>
                    <div className="mb-3">
                        <h3 className="mb-3 text-xl font-normal">Event Name</h3>
                        <input className="h-12 w-full p-2" type="text" name="Event Title"  />
                    </div>
                    <div className="mb-3">
                        <h3 className="mb-3 text-xl font-normal">Event Description</h3>
                        <input className="h-12 w-full p-2" type="text" name="Event Title"  />
                    </div>
                    <div className="mb-3">
                        <h3 className="mb-3 text-xl font-normal">Event Details</h3>
                        <textarea
                            className="w-full p-2"
                            id="details"
                            name="details"
                            rows="5"
                            cols="40"
                            placeholder="Enter detailed information here..."
                        />
                    </div>
                    <button className="h-12 w-full p-2 bg-blue-100 hover:bg-blue-400 mb-6">Submit</button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default CreateEvent;
