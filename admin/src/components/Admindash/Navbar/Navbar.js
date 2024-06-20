import React from 'react'
import { Link } from "react-router-dom";
import "./navbar.css"

const Navbar = () => {
  return (
    <>
      <h4 style={{color:'white'}}>Admin Dashboard</h4>

      <div className="list mt-5">
          <div className="listitem">
            <Link to="/admin/profile">Profile</Link>
          </div>
          <div className="listitem">
            <Link to="/admin/project">Project</Link>
          </div>
          <div className="listitem">
            <Link to="/admin/contact">Contact</Link>
          </div>
        </div>
    </>
  )
}

export default Navbar