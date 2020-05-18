import React, { Component } from 'react';



var account_body = () => {

    var getCookie = cname => {
        /**
         * Gets data of local cookie of given cname
         */
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) === ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }
    
    var email = getCookie('email');

    var changeEmail = () => {
        var newEmail = document.getElementById('newEmail');
        const requestOptions =
        {
          method: 'POST',
          headers: {
          },
          body: JSON.stringify({
            email: email,
            newEmail: newEmail
          })
        };
          fetch('https://api.expensey.app/users/expenses/del_expense',requestOptions) 
              .then(res => res.json())
              .then (data => 
                {
                    console.log(data);
                    if (data == 'Expense deleted successfully.'){
                        window.location.reload();
                    }
                })
              .catch(error => console.log(error));
    }

    var changePw = () => {
        var currPw = document.getElementById('currPw');
        var newPw = document.getElementById('newPw');
        var newPwAuth = document.getElementById('newPwAuth');

        const requestOptions =
        {
          method: 'POST',
          headers: {
          },
          body: JSON.stringify({
            email: email,
            currPw: currPw,
            newPw: newPw,
            newPwAuth: newPwAuth
          })
        };
          fetch('https://api.expensey.app/users/expenses/del_expense',requestOptions) 
              .then(res => res.json())
              .then (data => 
                {
                    console.log(data);
                    if (data == 'Expense deleted successfully.'){
                        window.location.reload();
                    }
                })
              .catch(error => console.log(error));
    }

    var delAccount = () => {
        const requestOptions =
        {
          method: 'POST',
          headers: {
          },
          body: JSON.stringify({
            email: email
          })
        };
          fetch('https://api.expensey.app/users/expenses/del_expense',requestOptions) 
              .then(res => res.json())
              .then (data => 
                {
                    console.log(data);
                    if (data == 'Expense deleted successfully.'){
                        window.location.reload();
                    }
                })
              .catch(error => console.log(error));
    }

    return (
        <div id="accountBody">
        <div id="changeEmail">
            <h2>Change Email</h2>
            <input type="text" placeholder="Enter new email address." id="newEmail"></input>
            <button>Update Email</button>
        </div>
        <div id="resetPw">
            <h2>Change Password</h2>
            <input type="text" placeholder="Enter current password." id="currPw"></input>
            <input type="text" placeholder="Enter new password." id="newPw"></input>
            <input type="text" placeholder="Confirm password." id="newPwAuth"></input>
            <button>Update password</button>
        </div>
        <h2>Delete Account</h2>
        <button id="delAccount">Delete Account</button>
        </div>
    )
}

export default account_body;