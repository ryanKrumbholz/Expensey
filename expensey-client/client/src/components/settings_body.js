import React from 'react';
import './settings_body.css';

const settings_body = props => {

    var toggleDarkMode = () => {
        //call to db to update user dkmode status

    }

  return (
      <div class="settings_body">
      <div class="settings_header">
      <h2>Settings</h2>
      </div>
      <div class="interface_settings">
      <h3>Interface</h3>
        <div class="dkmode">
            <p>Dark Mode</p>
                <label class="switch">
                <input type="checkbox" onClick={toggleDarkMode()}/>
                <span class="slider round"></span>
                </label>
        </div>
        </div>
      </div>
  )
}

export default settings_body;