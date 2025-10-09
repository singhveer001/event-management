import React from 'react'
import { useState } from 'react';
import Dropdown from './Dropdown';

const Header = () => {
  const username = JSON.parse(localStorage.getItem("adminSession"))?.username;
  return( 
    <div className='flex justify-between item-center p-4'>
        <div>
            <h1 className='text-xs'>Welcome Back!</h1>
            <p className='text-xl font-semibold'>{username}</p>
        </div>
        <div className='flex items-center space-x-5'>
            <div className='hidden md:flex '>
                <input type="text" placeholder='Search...' className='bg-indigo-100/30 px-4 py-2 rounded-lg focus:outline-0 focus:ring-2 focus-ring-indigo-600' />
            </div>
            <Dropdown/>
        </div>
    </div>
  )
}

export default Header
