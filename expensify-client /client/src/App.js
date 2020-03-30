import React, { Component } from 'react';
import Sidebar from './components/sidebar'
import ExpensesBody from './components/expenses_body'
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
  render () {
    return(
      <div class="App">
        <Sidebar/>
        <ExpensesBody /> {/* will add function to switch between reports and this */}
        <p className="App-intro">;{this.state.apiResponse}</p>
      </div>
    );
  }

  
}

export default App;
