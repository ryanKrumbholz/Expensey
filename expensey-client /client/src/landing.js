import React from 'react';
import ReactDOM from 'react-dom';
import './landing.css';
import * as serviceWorker from './serviceWorker';

const Landing = (props) => {

  var login = () => {
    //Getting the email and pword that user entered into the field
    var email = document.getElementsByClassName("emailAddress")[0].value
    var pword = document.getElementsByClassName("pword")[0].value
    validateLogin(email,pword);
  };

  var createAccountExpand = () => {
    //revealing create account elements
    var elems = document.getElementsByClassName("createAccount");
    for (var i = 0; i < elems.length;  i++)  {
      elems[i].style.visibility = "visible";
      elems[i].style.height = "auto";
    }
    //Hiding login elements
    var elems = document.getElementsByClassName("preCreate");
    for (var i = 0; i < elems.length;  i++)  {
      elems[i].style.visibility = "hidden";
      elems[i].style.height = "0";
    }
  };

  var createAccount = () => {
    //Getting data from form
    var username = document.getElementsByClassName("username")[0].value
    var email = document.getElementsByClassName("emailAddress")[0].value
    var emailConf = document.getElementsByClassName("emailAddressConf")[0].value
    var pword = document.getElementsByClassName("pword")[0].value
    var pwordConf = document.getElementsByClassName("pwordConf")[0].value

    const requestOptions =
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: Date.now(),
        username: username,
        email : email,
        password: pword
      })};

      if (newAccountValidation(email, emailConf,  pword, pwordConf)) {
        fetch('http://localhost:9000/users/adduser',requestOptions) 
          .then(res => res.json())
          .then (data => 
            {
              if (data == "Account created successfully") {
                //reloads window to login screen
                window.location.reload();
              }
            })
          .catch(error => console.log(error));
      }
  };

  function validateLogin(email, pword) {
    const requestOptions =
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email : email,
        password: pword
      })};

    fetch('http://localhost:9000/users/login',requestOptions) 
          .then(res => res.json())
          .then (data => 
            {
              if (data[0] == "Account authorization successful!") {
                //Allows user to access their account
                sessionStorage.setItem('status', true);

                //reloads window to app
                window.location.reload();

                console.log(data[0]);
                sessionStorage.setItem('uid', data[1][0]);
                sessionStorage.setItem('uname', data[1][1]);
                sessionStorage.setItem('email', data[1][2]);
              }
              else {
                console.log(data);
              }
            })
          .catch(error => console.log(error));
  }

  function displayErrMsg(i) {
    var errorMessages = [
      "Either the email address or password are incorrect. Please retry.",
      "Account already exist with this email address.",
      "Please check to make sure the email addresses and passwords match!",
     "One or more fields are empty."
    ];
    var elem = document.getElementsByClassName("errorMessage")[0];

    elem.innerHTML = errorMessages[i];
    elem.style.visibility = "visible";
    elem.style.height = "auto";
  }

  function newAccountValidation(email, emailConf,  pword, pwordconf) {
    if (email  != emailConf  || pword != pwordconf){
      displayErrMsg(2);
      return false;
    }
    else if (email == "" || pword == "") {
      displayErrMsg(3);
      return false;
    }
    else if (/* call to see if account with email address already exist*/  1==2){
      //uncomment when elseif works
      displayErrMsg(1);
      return false;
    }
    else{
      return true;
    }
  }
    return (
        <div class="login">
          <p class="errorMessage"></p> 
            <h2>Email Address</h2>
            <form onSubmit="">
              <label>
                <input class="emailAddress" type="text" onChange="" />
              </label>
            </form>
            <div class="createAccount">
              <h2>Confirm Email Address</h2>
              <form onSubmit="">
                <label>
                  <input class="emailAddressConf" type="text" onChange="" />
                </label>
              </form>
            </div>
            <div class="createAccount">
              <h2>Username</h2>
              <form onSubmit="">
                <label>
                  <input class="username" type="text" onChange="" />
                </label>
              </form>
            </div>
            <div class="createAccount">
              <h2>Confirm Username</h2>
              <form onSubmit="">
                <label>
                  <input class="usernameConf" type="text" onChange="" />
                </label>
              </form>
            </div>
            <h2>Password</h2>
            <form onSubmit="">
              <label>
                <input class="pword" type="text" onChange="" />
              </label>
            </form>
            <div class="createAccount">
              <h2>Confirm Password</h2>
              <form onSubmit="">
                <label>
                  <input class="pwordConf" type="text" onChange="" />
                </label>
              </form>
            </div>
            <button onClick={login} class="preCreate">Login</button>
            <button onClick={createAccountExpand} class="preCreate">Sign up</button>
            <button onClick={createAccount} class="createAccount">Create</button>
        </div>
    );
}

export default Landing;


