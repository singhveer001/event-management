import React, { useState } from "react";
import InputBox from "../components/InputBox";
import { Button } from "../components/Button";
import Option from "../components/Option";
import { adminSignup } from "../api/Admin";
import { userSignup } from "../api/User";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [option, setOption] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const payload = { username, email, password };
      let res;
      if (parseInt(option) === 1) {
        res = await adminSignup(payload);
      } else if (parseInt(option) === 2) {
        res = await userSignup(payload);
      }
  
      const token = res.data.token ; 
      const session = JSON.stringify(res.data.session);
      if (token) {
        if(option == "1"){
          localStorage.setItem("adminToken",token);
          localStorage.setItem("adminSession", session);
          navigate('/dashboard');
        }
        else{
          localStorage.setItem("userToken", token);
          localStorage.setItem("userSession", session);
          navigate('/')
        }
      } else {
        console.error("Token not found in response.");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  

  return (
    <div className="bg-gray-400 flex h-screen justify-center">
      <div className="flex justify-center flex-col ">
        <div className="rounded-lg bg-white w-80 p-2 h-max px-4">
          <InputBox
            type={"text"}
            label={"Username:"}
            placeholder={"Enter your username"}
            name={"Username"}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <InputBox
            type={"text"}
            label={"Email:"}
            placeholder={"Enter your email"}
            name={"email"}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <InputBox
            type={"password"}
            label={"Password:"}
            placeholder={"Enter your password"}
            name={"password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Option
            label={"Signup as"}
            label2={"Select an option"}
            onChange={(e) => {
              setOption(e.target.value);
            }}
          />
          <div className="pt-4">
            <Button
              onClick={() => {
                handleSubmit
              }}
              label={"Submit"}
              disable={!username || !email || !password || !option}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
