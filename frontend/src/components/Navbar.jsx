import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";
import { useEffect } from "react";
const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(token){
      setIsLogin(true);
    }
  },[])
  return (
    <div className="flex justify-between items-center p-3 bg-slate-50 h-15">
      <Link to="/" className="text-lg font-bold">
        Logo
      </Link>
      <div className="flex gap-5 md:gap-10">
        {isLogin ? (
          <ProfileDropdown/>
        ) : (
          <Link to="/signin" className="hover:underline">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
