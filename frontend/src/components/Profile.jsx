import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaPhone, FaSchool, FaMapMarkerAlt, FaUniversity, FaBus } from 'react-icons/fa';

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
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-6">
        {/* Profile Image */}
        <div className="flex justify-center">
          <div className="relative w-32 h-32">
            <img
              src={`http://localhost:3000${profile.photo}`}
              alt={profile.name}
              className="w-full h-full rounded-full shadow-md border-4 border-white object-cover"
            />
          </div>
        </div>

        {/* Name */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
          {profile.name}
        </h2>

        {/* Info List */}
        <div className="space-y-3 text-gray-700 text-sm md:text-base">
          <p><strong>Department:</strong> {profile.department}</p>
          <p className="flex items-center gap-2"><FaPhone /> {profile.phone}</p>
          <p className="flex items-center gap-2"><FaSchool /> {profile.school}</p>
          <p className="flex items-center gap-2"><FaUniversity /> {profile.college}</p>
          <p className="flex items-center gap-2"><FaMapMarkerAlt /> Present: {profile.presentAddress}</p>
          <p className="flex items-center gap-2"><FaMapMarkerAlt /> Permanent: {profile.permanentAddress}</p>
          <p className="flex items-center gap-2"><FaBus /> Bus Stop: {profile.busStopage}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
