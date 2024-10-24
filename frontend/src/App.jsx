import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import AdminRoute from "./routes/AdminRoute";
import UserRoute from "./routes/UserRoute";
import PageNotFound from "./pages/PageNotFound";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Events from "./pages/user/Events";
import UserParticipants from "./pages/user/UserParticipants";
import Dashboard from "./pages/admin/Dashboard";
import Layout from "./components/admin/Layout";
import AdminEventList from "./pages/admin/AdminEventList";
import CreateEvent from "./pages/admin/CreateEvent";
import Profile from "./pages/admin/Profile";
import AccountSetting from "./pages/admin/AcountSetting";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />    
          <Route path="/dashboard" element={<Layout/>}> 
             <Route index element={<Dashboard/>}/>
             <Route path="admin-event-list" element={<AdminEventList/>}/>
             <Route path="create-event" element={<CreateEvent/>}/>
             <Route path="profile" element={<Profile/>}/>
             <Route path="setting" element={<AccountSetting/>}/>
          </Route> 
          <Route path="/event-list" element={<Events/>} />   
          <Route path="/user-participants" element={<UserParticipants/>} />  
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/signin" element={<SignIn/>} />
          <Route path="/admin/*" element={<AdminRoute />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
