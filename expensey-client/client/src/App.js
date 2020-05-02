import React, { Component } from 'react';
import Sidebar from './components/sidebar';
import ExpensesBody from './components/expenses_body';
import Login from './login';
import NewExpense from './components/new_expense';
import { BrowserRouter as Router, Route} from  "react-router-dom";
import './App.css';

class App extends Component {

  state = {
    seen: false
  };

toggleWindow = () => {
    this.setState({
      seen: !this.state.seen
    });
    console.log("Window Toggled");
  }

  render () {
    if(sessionStorage.getItem('status')){return(
        <div class="App">
          <Sidebar/>
          <ExpensesBody toggleWindow = {this.toggleWindow} currSeenState = {this.state.seen}/> 
          {this.state.seen ? <NewExpense toggleWindow = {this.toggleWindow}/> : null}
        </div>
      // </Router>
    );}
    else{
      return(
        <Login/>
      );
    }
  }
}

export default App;
