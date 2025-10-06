import React, { useState } from "react";
import { createEvent } from "../../api/Admin";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
        eventTitle : "",
        eventDesc : "",
        eventDetail: "",
        eventImg : null,
        eventLocation : "",
        eventDate : ""       
  })
  const [ preview, setPreview] = useState(null);

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({
        ...prevData,
        [name] : value
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(file){
        setFormData((prev) => ({ ...prev, eventImg : file}));
        setPreview(URL.createObjectURL(file));
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await createEvent(formData);
        console.log("EventCreated SuccessFully");
        setFormData({
            eventTitle:"",
            eventDesc: "",
            eventDetail : "",
            eventImg: null,
            eventLocation : "",
            eventDate : ""
        })
        setPreview(null);
    } catch (error) {
        console.error(error);
    }
  }
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
                    <label htmlFor="eventImg" className="border-4 cursor-pointer border-gray-200 h-80 text-gray-400 w-full flex items-center justify-center text-xl font-semibold relative">
                        {preview ? (
                            <img src = {preview} alt="Event Preview" className="object-cover w-full h-full" />
                        ): (
                         "+ Add Image"   
                        )}
                        <input id="eventImg" type="file" name="eventImg" accept="image/*" className="hidden" onChange={handleImageChange} />
                    </label>
                    {preview && (
                        <button
                            onClick={() => {
                            setPreview(null);
                            setFormData((prev) => ({ ...prev, eventImg: null }));
                            }}
                            className="mt-2 text-sm text-red-500 underline"
                        >
                            Remove Image
                        </button>
                    )}
                    <div className="mt-6">
                        <h3 className="mb-3 text-xl font-normal">Event Date</h3>
                        <input className="h-12 w-full p-2" type="date" name="eventDate" value={formData.eventDate} onChange={handleInputChange} />
                    </div>
                </div>
                <div>
                    <div className="mb-3">
                        <h3 className="mb-3 text-xl font-normal">Event Title</h3>
                        <input className="h-12 w-full p-2" type="text" name="eventTitle" value={formData.eventTitle} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <h3 className="mb-3 text-xl font-normal">Event Description</h3>
                        <input className="h-12 w-full p-2" type="text" name="eventDesc" value={formData.eventDesc} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <h3 className="mb-3 text-xl font-normal">Event Location</h3>
                        <input className="h-12 w-full p-2" type="text" name="eventLocation" value={formData.eventLocation} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <h3 className="mb-3 text-xl font-normal">Event Details</h3>
                        <textarea
                            className="w-full p-2"
                            id="details"
                            name="eventDetail"
                            rows="5"
                            cols="40"
                            value={formData.eventDetail}
                            onChange={handleInputChange}
                            placeholder="Enter detailed information here..."
                        />
                    </div>
                    <button className="h-12 w-full p-2 bg-blue-100 hover:bg-blue-400 mb-6" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default CreateEvent;
