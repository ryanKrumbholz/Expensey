import React from 'react';
import './sidebar.css';

const sidebar = props => {
  //TODO tie into the  backend

  //function to encapsulate data with getters and setters
  var userData = function(){
    var userImg = null;
    var name = null;
    var uid = null;
    var defaultUserImg = "https://st3.depositphotos.com/13159112/17145/v/450/depositphotos_171453724-stock-illustration-default-avatar-profile-icon-grey.jpg";
    
    return {
      getUserImg : function () {
        return userImg;
      },
      getName : function () {
        return name;
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
      setName : function (newName) {
        name = newName;
      },
      setUid : function (newUid) {
        uid = newUid;
      }
    }
  }();

  function delCookies() {
    function eraseCookie(name) {
      var d = new Date();
      d.setTime(d.getTime()+(-1*24*60*60*1000));
      document.cookie = name+"= ;" +"  expires=" + d + ";";
    }
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++)
      eraseCookie(cookies[i].split("=")[0]);
  }

  var logout = () => {
    delCookies();
    window.location.reload();
    window.localStorage.clear();
  }

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

  //if statements to set userImg to default for testing
  if (userData.getUserImg() == null) {
    var uimg = getCookie('uimg');
    if (uimg){
      userData.setUserImg(uimg);
    }
    else {
      userData.setUserImg(userData.getDefaultImg());
    }
    
  }

  //if statement to set userImg to default for testing
  if (userData.getName() == null) {
    userData.setName(getCookie("name"));
  }

  //if statement to set uid to default for testing
  if (userData.getUid() == null) {
    userData.setUid(getCookie("uid"));
  }


  return (
      <div className="Sidebar">
        <img src={userData.getUserImg()}></img>
        <a href="/account">{userData.getName()}</a>
        <div class="links">
          <a href="/">Expenses</a>
          <a href="/settings">Settings</a>
        </div>
        <div class="logout">
          <a href="" onClick={logout}>Sign out</a>
        </div>
      </div>
  )
}

export default sidebar;