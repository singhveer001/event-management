import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminEventList from '../pages/admin/AdminEventList'
import ConstructorPage from '../pages/ConstructorPage'
import UserEventList from '../pages/admin/UserEventList'

const AdminRoute = () => {
  return (
    <Routes>
        <Route path='/' element={<AdminEventList/>}/>
        <Route path='/user' element={<UserEventList/>}/>
        <Route path='*' element={<ConstructorPage/>}/>
    </Routes>
  )
}

export default AdminRoute