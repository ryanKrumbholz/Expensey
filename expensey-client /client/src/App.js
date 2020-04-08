import React, { Component } from 'react';
import Sidebar from './components/sidebar';
import ExpensesBody from './components/expenses_body';
import Landing from './landing';
import { BrowserRouter as Router, Route} from  "react-router-dom";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    if(sessionStorage.getItem('status')){return(
        <div class="App">
          <Sidebar/>
          <ExpensesBody /> 
        </div>
      // </Router>
    );}
    else{
      return(
        <Landing/>
      );
    }
  }
}

export default App;
