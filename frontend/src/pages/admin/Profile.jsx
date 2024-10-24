import React from "react";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className="p-4">
        <div className="text-xl font-medium text-slate-500 border-b pb-2 mb-8">Profile</div>
        <div className=" px-5 border  ">
            <div className="text-xl font-medium text-slate-500 border-b pb-2 mt-6">
                Profile Information
            </div>
        <div className="xl:grid  xl:grid-cols-[1fr,2fr] md:grid md:grid-cols-[1fr,2fr] flex flex-wrap gap-x-10 pt-6">
            <div className="mb-3">
                <div className="relative">
                    <img 
                    className="border-4 mb-3 cursor-pointer border-gray-200 h-60 w-full object-cover text-gray-400 max-w-full flex items-center justify-center text-xl font-semibold" 
                    src="https://img.freepik.com/free-photo/man-with-coffee_1187-3103.jpg?semt=ais_hybrid" 
                    alt="Admin Image" 
                    />
                    <Link to={"/dashboard/setting"} className="absolute top-2 right-2 rounded-full p-1 shadow bg-slate-100 hover:bg-gray-200">
                        <FaEdit className="h-5 w-5" />
                    </Link>
                </div>

                <ul>
                    <li className="grid grid-cols-2 border-b mb-3">
                        <span>Name:</span>
                        <span>Veerbhan Singh</span>
                    </li>
                    <li className="grid grid-cols-2 border-b mb-3">
                        <span>Email Address:</span>
                        <span>Veer@gmail.com</span>
                    </li>
                    <li className="grid grid-cols-2 border-b mb-3">
                        <span>Gender:</span>
                        <span>Male</span>
                    </li>
                    <li className="grid grid-cols-2 border-b mb-3">
                        <span>Address:</span>
                        <span>Hello From clifornia</span>
                    </li>
                </ul>
            </div>

            <div>
                <div className="mb-3">
                    <h3 className="mb-3 text-xl font-medium">About Me</h3>
                    <p className="text-base font-light leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus aut dolorum tenetur reprehenderit perspiciatis ad, fugiat porro quasi ipsa! Laboriosam, error temporibus! Repellat, facilis blanditiis! Dolorem soluta ab ducimus odit!
                    </p>
                </div>
            </div>
        </div>

        </div>
    </div>
  );
};

export default Profile;
