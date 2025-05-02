import React from 'react';
import banner from "../images/banner.jpg";
import{Link} from "react-router-dom"
import UserCard from './UserCard';

function Banner() {
  return (
    <div
      className="relative h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${banner})` }}
    >
      {/* Top gradient: soft red overlay for all screens */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#7f1d1d]/80 to-transparent"></div>

      {/* Bottom gradient: fades upward in red tones */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#991b1b]/70 to-transparent"></div>

      {/* Navbar */}
      <div className="absolute top-0 left-0 w-full flex items-center justify-center py-4 z-20">
        <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-xl">
        <Link to="/" className='text-3xl font-bold text-white'>বংশী-১৯</Link >
        <hr className='text-white font-extrabold' />

        </h1>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <p className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-[#f87171] via-[#ef4444] to-[#dc2626] bg-clip-text text-transparent drop-shadow-xl mb-6">
          Connect with us
        </p>
        {/* Cool Connect button */}
        <button className="bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold py-3 px-8 rounded-full text-2xl shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-2xl hover:ring-4 hover:ring-[#ef4444] hover:ring-opacity-60">
          <Link to="/usercard" >Connect</Link>
        </button>
      </div>
    </div>
  );
}

export default Banner;
