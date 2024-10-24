import React, { useState } from "react";
import { Link } from "react-router-dom";
// icons
import { LuBox, LuUser } from "react-icons/lu";
import { SiEventstore } from "react-icons/si";

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState(0);
  const handleLinkClick = (index) => {
    setActiveLink(index);
  };
  const SIDEBAR_LINKS = [
    { id: 1, path: "/dashboard", name: "Dashboard", icon: SiEventstore },
    { id: 2, path: "/admin-event-list", name: "AdminEventList", icon: LuBox },
    { id: 3, path: "/create-event-list", name: "CreateEventList", icon: LuUser},
  ];
  return (
    <div className="w-16 md:w-56 fixed left-0 top-0 z-10 h-screen border-r pt-2 px-4 bg-white">
      {/* logo */}
      <Link to={"/dashboard"} className="flex">
        <img src="/logo.svg" alt="logo" className="w-20 flex" />
        <p className="hidden md:flex w-8 font-medium text-xl pt-4" >BookaSpot</p>
      </Link>

      {/* Nvigation Lihnks */}
      <ul className="mt-6 space-y-6">
        {SIDEBAR_LINKS.map((link, index) => (
          <li
            key={index}
            className={
              `font-medium rounded-md py-2 px-5 hover:bg-gray-100 hover:text-indigo-500 ${activeLink == index ? "bg-indigo-100 text-indigo-500" : ""}`
            }
          >
            <Link
              to={link.path}
              className="flex justify-center md:justify-start item-center  md:space-x-5 "
              onClick={() => handleLinkClick(index)}
            >
              <span>{link.icon()}</span>
              <span className="text-sm text-gray-500 hidden md:flex">
                {link.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
