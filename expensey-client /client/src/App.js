import React, { Component } from 'react';
import Sidebar from './components/sidebar';
import ExpensesBody from './components/expenses_body';
import Landing from './landing';
import { BrowserRouter as Router, Route} from  "react-router-dom";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: Boolean };
    console.log(localStorage.getItem('status'));
    if (!localStorage.getItem('stats')) {
      this.state.loggedIn = false;
    }
    else {
      this.state.loggedIn = true;
    }
  }

  render () {
    if(this.state.loggedIn == true){return(
        <div class="App">
          <Sidebar/>
          <ExpensesBody /> 
        </div>
      // </Router>
    );}
    else{
      return(
        <Landing appState = {this.state.loggedIn}/>
      );
    }
  }
}

export default App;
