import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Segment
} from 'semantic-ui-react';
import { Route, Switch } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import Login from './Login.jsx';
import Planets from './Planets.jsx';
import { withRouter } from 'react-router'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" 
          component={Login}
          />
          <Route exact path="/planets"  component={Planets} />
        </Switch>
        </div>
    );
  }
}

export default App;
