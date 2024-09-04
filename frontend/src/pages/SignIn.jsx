import React from 'react'
import InputBox from '../components/InputBox'
import { Button } from '../components/Button'
import Option from '../components/Option'

const SignIn = () => {
  return (
    <div className='bg-gray-400 flex h-screen justify-center'>
    <div className='flex justify-center flex-col '>
      <div className='rounded-lg bg-white w-80 p-2 h-max px-4'>
        <InputBox type={"text"} label={"Email:"} placeholder={"Enter your email"} name={"email"}/>
        <InputBox type={"password"} label={"Password:"} placeholder={"Enter your password"} name={"password"}/>
        <Option label={"Login as"} label2={"Select an option"}/>
        <div className='pt-4'>
        <Button label={"Submit"}/>
        </div>
      </div>
    </div>
  </div>
  )
}

export default SignIn