import React, { useState } from 'react'
import BG from "./../assets/bg.jpg";
import Typing from '../components/Typing';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='h-[100vh] w-full fixed'>
      <img src={BG} alt="" className='h-full w-full object-cover' />
      <div className="absolute w-full md:w-1/2 h-full bg-[#0e1d30]/80 backdrop-blur-xl z-10 top-0 right-0 flex flex-col justify-center px-6 items-center md:items-start md:px-16 text-white">
        <p className="text-2xl">Hello there, are you feeling</p>
        <h1 className="text-3xl font-semibold my-2">
          <Typing />?
        </h1>
        <p className='text-xl mt-6 text-center md:text-left'>Our mental health chatbot powered by AI is here to help</p>
        <Link to={'/chatroom'} className='py-3 px-6 bg-white text-[#0e1d30] font-semibold flex mt-3 rounded-full'>
          Proceed
        </Link>
      </div>
    </div>
  )
}

export default Home