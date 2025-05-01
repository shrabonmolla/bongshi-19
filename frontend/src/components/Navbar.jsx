import React from 'react'
import{Link} from "react-router-dom"

function Navbar() {
  return (
    <div className='bg-red-500 flex text-white gap-10 p-6 mb-10 items-center'>
    <Link to="/" className='text-3xl font-bold'>বংশী-১৯</Link >
    <Link to="/register" >Register</Link>
    <Link to="/usercard" >Members</Link>

</div>

  )
}

export default Navbar