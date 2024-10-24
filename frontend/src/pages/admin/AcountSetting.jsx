import React from "react";
import InputBox from "../../components/InputBox";

const AccountSetting = () => {
  return (
    <div className="p-4">
      <div className="text-xl font-medium text-slate-500 border-b pb-2 mb-8">
        Account Settings
      </div>
      <div className=" px-5 border  ">
        <div className="text-xl font-medium text-slate-500 border-b pb-2 mt-6">
          Account Information
        </div>
        <InputBox
          type={"text"}
          label={"FirstName:"}
          placeholder={"Enter your firstname"}
          name={"firstname"}
        />
        <InputBox
          type={"text"}
          label={"LastName:"}
          placeholder={"Enter your lastname"}
          name={"lastname"}
        />
        <InputBox
          type={"text"}
          label={"Email:"}
          placeholder={"Enter your email"}
          name={"email"}
        />
        <InputBox
          type={"text"}
          label={"Address:"}
          placeholder={"Enter your Address"}
          name={"address"}
        />
        <div className="mt-2 flex flex-col">
        <label className="text-sm font-medium" for="gender">Gender:</label>
        <select className="mt-2 h-9 rounded-sm" name="gender">
            <option value="">Please select one…</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
        </select>
        </div>

        <div className="my-2">
        <h3 className=" text-sm font-medium">About:</h3>
        <textarea
          className="w-full p-2 mt-2"
          id="about"
          name="about"
          rows="4"
          cols="40"
          placeholder="Enter About yourself..."
        />
        </div>

        <div className="mb-3">
            <h3 className="text-sm font-medium mb-2">Upliad Image:</h3>
            <input type="file" id="myFile" name="filename"/>
        </div>


        <button className="bg-slate-200 px-4 py-2 rounded-sm my-6 hover:bg-slate-400">Profile Update</button>

      </div>
    </div>
  );
};

export default AccountSetting;
