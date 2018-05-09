import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import Home from '../../containers/Home';
// import Dashbord from '../Dashbord/Dashbord'
import Container from '../../containers/index';
import Driver from '../Driver/driver'
import Login from '../login';
import DashBoard from '../DashBoard';

class Main extends Component {
  render() {
    return (
      <div className="main">
        <Route exact path="/" component={Home} />
        <Route exact path="/index" component={Container} />
        <Route exact path="/admin/" component={Container} />
        <Route exact path="/admin/drivers/" component={Container} />
        <Route exact path="/login" component={Login} />
      </div>

    )
  }
}

export default Main
