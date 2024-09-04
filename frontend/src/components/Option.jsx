import React from "react";

const Option = ({ label, label2, onChange }) => {
  return (
    <div>
      <form className="max-w-sm mx-auto pt-4">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {label}
        </label>
        <select
          defaultValue={label2}
          onChange={onChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option disabled>{label2}</option>
          <option value="1">Admin</option>
          <option value="2">User</option>
        </select>
      </form>
    </div>
  );
};

export default Option;
