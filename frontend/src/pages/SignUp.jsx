import React, { useEffect, useState } from "react";
import InputBox from "../components/InputBox";
import { Button } from "../components/Button";
import Option from "../components/Option";
import axios from "axios";
import { adminSignup } from "../api/Admin";
import { userSignup } from "../api/User";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [option, setOption] = useState("");
  const [btnLoad, setBtnLoad] = useState(false);

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
        localStorage.setItem("token", token);
        localStorage.setItem("session", session);
      } else {
        console.error("Token not found in response.");
      }
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setBtnLoad(false);
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
                setBtnLoad(true); 
                handleSubmit();
              }}
              label={"Submit"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
