import React from 'react';
import ReactDOM from 'react-dom';
import './landing.css';
import * as serviceWorker from './serviceWorker';

const Landing = () => {

  var errorMessages = ["Either the email address or password are incorrect. Please retry.",
    "Account already exist with this email address.",
    "Please check to make sure the email addresses and passwords match!",
    "One or more fields are empty."];

  var login = login => {
    //Getting the email and pword that user entered into the field
    var email = document.getElementsByClassName("emailAddress")[0].value
    var pword = document.getElementsByClassName("pword")[0].value
    validateLogin(email,pword);
  };

  var createAccountExpand = createAccountExpand => {
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

  var createAccount = createAccount => {
    //TODO fix POST ERROR 
    var username = document.getElementsByClassName("username")[0].value
    var email = document.getElementsByClassName("emailAddress")[0].value
    var emailConf = document.getElementsByClassName("emailAddressConf")[0].value
    var pword = document.getElementsByClassName("pword")[0].value
    var pwordConf = document.getElementsByClassName("pwordConf")[0].value

    fetch('http://localhost:9000/users/createuser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: Date.now(),
      username: username,
      email : email,
      password: pword
    })}).then(res => {
      return res.json()
    }).then (data => console.log(data))
    .catch(error => console.log('ERROR'));

    newAccountValidation(email, emailConf, pword,  pwordConf);
  };

  function validateLogin(email, pword) {
    //Checking if either field is blank
    if (email == "" || pword == "") {
      displayErrMsg(0);
    }
    else {
      //TODO contact API to check whether password matches user email address 
      console.log(email)
      console.log(pword)
    }
  }

  function displayErrMsg(i) {
    var elem = document.getElementsByClassName("errorMessage")[0]
    elem.innerHTML = errorMessages[i];
    elem.style.visibility = "visible";
    elem.style.height = "auto";
  }

  function newAccountValidation(email, emailConf,  pword, pwordconf) {
    if (email  != emailConf  || pword != pwordconf){
      displayErrMsg(2);
    }
    else if (email == "" || pword == "") {
      displayErrMsg(3);
    }
    else if (/* call to see if account with email address already exist*/  1==1){
      //uncomment when elseif works
      // displayErrMsg(1);
    }
    else{
      //TODO  Contact api and create new db entry
      window.location.reload();
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


