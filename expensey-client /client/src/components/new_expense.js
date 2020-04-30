import React from 'react';
import './new_expense.css';

const new_expense = props => {

    return (
        <div className="bg">
            <div className="window">
                <a href='#' class="toggleButton" onClick={props.toggleWindow}>×</a>
                <h3>Date</h3>
                <form action="">
                <label for="From"></label>
                <input type="date" id="" name=""/>
              </form>
                <h3>Merchant</h3>
                <form onSubmit="">
                    <label>
                    <input class="emailAddress" type="text" onChange="" placeholder="Type your email address" />
                    </label>
                </form>
                <h3>Amount</h3>
                <form onSubmit="">
                    <label>
                    <input class="emailAddress" type="text" onChange="" placeholder="Type your email address" />
                    </label>
                </form>
                <h3>Category</h3>
                <form onSubmit="">
                    <label>
                    <input class="emailAddress" type="text" onChange="" placeholder="Type your email address" />
                    </label>
                </form>
                <h3>Description</h3>
                <form onSubmit="">
                    <label>
                    <input class="emailAddress" type="text" onChange="" placeholder="Type your email address" />
                    </label>
                </form>
                <button onClick={props.toggleWindow}>Save</button>
            </div>
        </div>
    )
  }
  
  export default new_expense;