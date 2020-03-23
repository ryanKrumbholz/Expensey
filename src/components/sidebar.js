import React from 'react';
import './sidebar.css';

const sidebar = props => {
  var userData = function(){
    var userImg = null;
    var username = null;
    var uid = null;
    var defaultUserImg = "https://st3.depositphotos.com/13159112/17145/v/450/depositphotos_171453724-stock-illustration-default-avatar-profile-icon-grey.jpg";
    
    return {
      getUserImg : function () {
        return userImg;
      },
      getUsername : function () {
        return username;
      },
      getDefaultImg : function () {
        return defaultUserImg;
      },
      getUid : function () {
        return uid;
      },
      setUserImg : function (newImg) {
        userImg = newImg;
      },
      setUsername : function (newUsername) {
        username = newUsername;
      },
      setUid : function (newUid) {
        uid = newUid;
      }
    }
  }();

  if (userData.getUserImg() == null) {
    userData.setUserImg(userData.getDefaultImg());
  }

  if (userData.getUsername() == null) {
    userData.setUsername("User Name");
  }

  if (userData.getUid() == null) {
    userData.setUid("000000");
  }

  return (
      <div className="Sidebar">
        <img src={userData.getUserImg()}></img>
        <a href="expensey.app/account+">{userData.getUsername()}</a>
        <ul>
          <li><a href="expensey.app/expenses+">Expenses</a></li>
          <li><a href="expensey.app/reports+">Reports</a></li>
          <li><a href="expensey.app/settings+">Settings</a></li>
        </ul>
      </div>
  )
}

export default sidebar;