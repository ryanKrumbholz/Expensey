import React, { Component } from 'react';
import Sidebar from './components/sidebar'
import ExpensesBody from './components/expenses_body'
import Landing from './landing'
import { BrowserRouter as Router, Route} from  "react-router-dom";
import './App.css';

 class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
      fetch("http://localhost:9000/testAPI")
          .then(res => res.text())
          .then(res => this.setState({ apiResponse: res }));
  }

  componentWillMount() {
      this.callAPI();
  }

  loggedIn() {
    //Create a t/f state to check if user is logged in or not
    return true;
  }

  render () {
    if(this.loggedIn()){return(
      // <Router>
        <div class="App">
          <Sidebar/>
          {/* <Route path="/" exact component={ExpensesBody}/> */}
          {/* will add function to switch between reports and this */}
          <ExpensesBody /> 
          <p className="App-intro">;{this.state.apiResponse}</p>
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
