import React from 'react';
import cover from "../images/cover.jpg";

function Home() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <img 
        className="w-full max-w-5xl mx-auto rounded-2xl shadow-md object-cover" 
        src={cover} 
        alt="cover-photo" 
      />
    </div>
  );
}

export default Home;
