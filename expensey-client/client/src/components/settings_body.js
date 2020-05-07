import React from 'react';
import './settings_body.css';

const settings_body = props => {

  var dkModeStatus = getCookie('dkModeStatus');

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
  
  if (dkModeStatus == 'true') {
    checked = 'false';
  }

    var toggleDarkMode = () => {

      if (dkModeStatus == 'true') {
        dkModeStatus = 'false';
      }
      else {
        dkModeStatus = 'true';
      }
      const requestOptions =
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email : this.getCookie('email'),
            dkModeStatus : dkModeStatus
            })};
          
          fetch('https://api.expensey.app/users/user/update',requestOptions) 
              .then(res => res.json())
              .then (data => 
                {
                  console.log("Dark mode stauts updated");
                })
              .catch(error => console.log(error));

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