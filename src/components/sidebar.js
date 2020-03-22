import React from 'react';
import './sidebar.css';

const sidebar = props => {
  return (
      <div className="Sidebar">
        <img src="https://media.istockphoto.com/photos/portrait-concept-picture-id1016761216?k=6&m=1016761216&s=612x612&w=0&h=j-DyZTSqmnhoHKsJdGmiMPnungpHiq9UTrvx4UylMQI="></img>
        <a href="">User Name</a>
        <ul>
          <li><a href="">Expenses</a></li>
          <li><a href="">Reports</a></li>
          <li><a href="">Settings</a></li>
        </ul>
      </div>
  )
}

export default sidebar;