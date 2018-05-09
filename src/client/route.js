import React from 'react';
import { Provider, connect } from 'react-redux';
import { syncHistoryWithStore} from 'react-router-redux';
import Home from '../components/Home';
import store from '../redux/store'
import { Router,IndexRoute,Route, Link,Switch} from 'react-router-dom'
import { version } from 'core-js';
import createHistory from 'history/createHashHistory'
import Container from '../containers';
import Driver from '../components/Driver/driver';
import Login from '../components/Login/Login'
import {  Redirect } from 'react-router'
import Auth from '../utils/auth'
import DashBoard from '../components/DashBoard/index'


const history = createHistory();
const location = history.location
const PrivateRoute = ({ component: Component, ...rest }) => (
  
  <Route {...rest} render={props => (
    Auth.isLogin ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)
const Routes = ({ location }) =>

<Provider store={store}>
  <Router history={history}  >
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <PrivateRoute  path="/admin" component={Container} />
      <PrivateRoute exact path="admin/drivers" component={Driver} />
    </Switch>
  </Router>
</Provider>;





export default Routes;
