import React from 'react';
import ReactDOM from 'react-dom';
import './login.css';
import * as serviceWorker from './serviceWorker';

const Login = (props) => {

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
      if (i == elems.length - 1) {
        elems[i].style.height = "4vh";
      }
      else {
        elems[i].style.height = "auto";
      }
      elems[i].style.visibility = "visible";
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
    var firstName = document.getElementsByClassName("firstName")[0].value;
    var lastName = document.getElementsByClassName("lastName")[0].value;
    var email = document.getElementsByClassName("emailAddress")[0].value;
    var emailConf = document.getElementsByClassName("emailAddressConf")[0].value;
    var pword = document.getElementsByClassName("pword")[0].value;
    var pwordConf = document.getElementsByClassName("pwordConf")[0].value;

    const requestOptions =
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: Date.now(),
        first_name : firstName,
        last_name : lastName,
        email : email,
        password: pword
      })};

      if (newAccountValidation(email, emailConf,  pword, pwordConf)) {
        fetch('https://localhost:9000/users/adduser',requestOptions) 
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

    fetch('https://localhost:9000/users/login',requestOptions) 

          .then(res => res.json())
          .then (data => 
            {
              var d = new Date();
              d.setTime(d.getTime() + (24*60*60*1000));

              if (data[0] == "Account authorization successful!") {
                //Allows user to access their account
                document.cookie = "status=true; expires=" + d.toUTCString() + ";";

                //reloads window to app
                window.location.reload();

                console.log(data[0]);
                document.cookie = "uid="+data[1][0]+"; expires=" + d.toUTCString() + ";";
                document.cookie = "name="+data[1][1]+"; expires=" + d.toUTCString() + ";";
                document.cookie = "email="+data[1][2]+"; expires=" + d.toUTCString() + ";";
              }
              else {
                displayErrMsg(0);
              }
            })
          .catch(error => console.log(error));
  }

  function displayErrMsg(i) {
    var errorMessages = [
      "Either the email address or password are incorrect. Please retry.",
      "Account already exist with this email address.",
      "Please check to make sure the email addresses and passwords match!",
     "One or more fields are empty.",
     "The email address entered is incorrect."
    ];
    var elem = document.getElementsByClassName("errorMessage")[0];

    elem.innerHTML = errorMessages[i];
    elem.style.visibility = "visible";
    elem.style.height = "auto";
  }

  function newAccountValidation(email, emailConf,  pword, pwordconf) {
    function validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

    if (email  != emailConf  || pword != pwordconf){
      displayErrMsg(2);
      return false;
    }
    if (email == "" || pword == "") {
      displayErrMsg(3);
      return false;
    }
    if (validateEmail(email) == false) {
      displayErrMsg(4);
      return false;
    }
    if (/* call to see if account with email address already exist*/  1==2){
      //uncomment when elseif works
      displayErrMsg(1);
      return false;
    }
      return true;
  }
    return (
      <div class="body">
      <a href="https://expensey.app">
        <h1 class="title">Expensey</h1>
        </a>
          <div class="login">
            <p class="errorMessage"></p> 
              <h2>Email Address</h2>
                  <input class="emailAddress" type="text" onChange="" placeholder="Type your email address"/>
              <div class="createAccount">
                <h2>Confirm Email Address</h2>
                    <input class="emailAddressConf" type="text" onChange="" placeholder="Type your email address" />
              </div>
              <div class="createAccount">
                <h2>First Name</h2>
                    <input class="firstName" type="text" onChange="" placeholder="Type your first name"/>
              </div>
              <div class="createAccount">
                <h2>Last Name</h2>
                    <input class="lastName" type="text" onChange="" placeholder="Type your last name" />
              </div>
              <h2>Password</h2>
                  <input class="pword" type="password" onChange="" placeholder="Type your password"/>
              <div class="createAccount">
                <h2>Confirm Password</h2>
                    <input class="pwordConf" type="password" onChange="" placeholder="Type your password"/>
              </div>
              <button onClick={login} class="preCreate">Login</button>
              <button onClick={createAccountExpand} class="preCreate">Sign up</button>
              <button onClick={createAccount} class="createAccount">Create</button>
          </div>
        </div>
    );
}

export default Login;


