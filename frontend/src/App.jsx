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

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />     
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
