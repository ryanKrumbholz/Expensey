import React from 'react';
import './settings_body.css';

const settings_body = props => {

  var getCookie = cname => {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  var checked = '';
  
  if (getCookie('dkModeStatus') == 'true') {
    checked = 'false';
  }

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
                <input type="checkbox" onClick={toggleDarkMode()} checked={checked} />
                <span class="slider round"></span>
                </label>
        </div>
        </div>
      </div>
  )
}

export default settings_body;