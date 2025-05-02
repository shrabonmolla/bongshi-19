import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaPhone, FaSchool, FaBluetooth, FaMapMarkerAlt, FaUniversity, FaBus } from 'react-icons/fa';
import { MdBloodtype } from "react-icons/md";
import { FaMapLocation } from "react-icons/fa6";

function Profile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => {
        const foundUser = data.users.find(user => user._id === id);
        setProfile(foundUser);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  }, [id]);

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      {/* 🔴 Transparent Red Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-transparent -z-10"></div>

      {/* Profile Card */}
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-6 ">
        {/* Profile Image */}
        <div className="flex justify-center ">
          <div className="relative w-32 h-32">
            <img
              src={`http://localhost:3000${profile.photo}`}
              alt={profile.name}
              className="w-full h-full rounded-full shadow-md border-4 border-white object-cover"
            />
          </div>
        </div>

        {/* Name */}
<div>
<h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
          {profile.name}
        </h2>
        <p className=' text-gray-600 text-center'> {profile.department}</p>

</div>
        <div>
          <p className='text-center font-sans '>Information</p>
          <hr />
        </div>

        {/* Info List */}
        <div className="space-y-3 text-gray-700 text-sm md:text-base [&>div]:shadow-lg [&>div]:p-4 [&>div]:rounded-md">
          <div className='flex  justify-between items-center '>
            {/* Info List-single-card */}
            <div className='flex items-center gap-4 font-bold'>
              <div><FaSchool/></div>
              <div>School</div>
            </div>
            <div>{profile.school}</div>
          </div>
          <div className='flex  justify-between items-center '>
            {/* Info List-single-card */}
            <div className='flex items-center gap-4 font-bold'>
              <div><FaUniversity/></div>
              <div>College</div>
            </div>
            <div>{profile.college}</div>
          </div>
          <div className='flex  justify-between items-center '>
            {/* Info List-single-card */}
            <div className='flex items-center gap-4 font-bold'>
              <div><FaMapMarkerAlt/></div>
              <div>Present Address</div>
            </div>
            <div>{profile.presentAddress}</div>
          </div>
          <div className='flex  justify-between items-center '>
            {/* Info List-single-card */}
            <div className='flex items-center gap-4 font-bold'>
              <div><FaMapLocation /></div>
              <div>Home District</div>
            </div>
            <div>{profile.permanentAddress}</div>
          </div>
          <div className='flex  justify-between items-center '>
            {/* Info List-single-card */}
            <div className='flex items-center gap-4 font-bold'>
              <div><FaBus/></div>
              <div>Bus Stop</div>
            </div>
            <div>{profile.busStopage}</div>
          </div>
          <div className='flex  justify-between items-center text-red-800'>
            {/* Info List-single-card */}
            <div className='flex items-center gap-4 font-bold'>
              <div><MdBloodtype/></div>
              <div>Blood Group</div>
            </div>
            <div>{profile.bloodGroup}</div>
          </div>
          <div className='flex  justify-between items-center '>
            {/* Info List-single-card */}
            <div className='flex items-center gap-4 font-bold'>
              <div><FaPhone/></div>
              <div>Phone</div>
            </div>
            <div>{profile.phone}</div>
          </div>

          
          


        </div>
      </div>
    </div>
  );
}

export default Profile;
