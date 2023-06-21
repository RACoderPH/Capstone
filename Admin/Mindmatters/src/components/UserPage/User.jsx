import React from 'react'
import './user.scss'
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'

const User = () => {
  return (
    <div className="user">
      <Sidebar/>
      <div className="userContainer">
        <Navbar/>
      </div>
    </div>
  )
}

export default User