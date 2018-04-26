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



const history = createHistory();



const Routes = ({ location }) =>
<Provider store={store}>
  <Router history={history}  >
    <Switch>
      <Route exact path="/" component={Home} />
      <Route  path="/admin" component={Container} />
    </Switch>
  </Router>
</Provider>;


export default Routes;
