import React from 'react';
import ReactDOM from 'react-dom';
import './landing.css';
import * as serviceWorker from './serviceWorker';

const Landing = () => {
    return (
        <div class="login">
            <h1>Email Address</h1>
            <form onSubmit="">
              <label>
                <input type="text" value="" onChange="" />
              </label>
          </form>
            <h1>Password</h1>
            <form onSubmit="">
              <label>
                <input type="text" value="" onChange="" />
              </label>
          </form>
            <button>Login</button>
            <a href="">Sign up</a>
        </div>
    );
}

export default Landing;


