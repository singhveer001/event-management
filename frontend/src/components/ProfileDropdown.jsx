import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Close the menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="flex w-full items-center justify-center gap-x-1.5 rounded-xl bg-white pl-3 rounded-r-3xl text-sm font-semibold text-gray-900 shadow-sm ring-inset ring-gray-500 hover:bg-gray-50"
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={toggleMenu}
        >
          <span className="p-1 text-base font-normal">Veerbhan Singh</span>
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100">
            <span className="font-medium text-lg">VB</span>
          </div>
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="flex gap-4 px-4 py-2 text-sm text-gray-700 border-b-2">
            <div className="flex items-center justify-center w-11 h-11 bg-slate-300 font-medium text-lg">
              VB
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-base font-medium">Veerbhan Singh</div>
              <div>Veerbhan@gmail.com</div>
            </div>
          </div>

          <div className="py-1" role="none">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-0"
              onClick={closeMenu}
            >
              Account settings
            </a>

            <Link
              to={"/user-participants"}
              href="#"
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-0"
              onClick={closeMenu}
            >
              User Participants
            </Link>

            <form method="POST" action="#" role="none">
              <button
                type="submit"
                className="block w-full px-4 py-2 text-left text-sm text-gray-700"
                role="menuitem"
                tabIndex="-1"
                id="menu-item-2"
                onClick={closeMenu}
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
