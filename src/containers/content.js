import React from 'react'
import { Route,Switch } from 'react-router-dom'
import { Layout } from 'antd'
import './content.less'
import Home from './Home';
import Driver from '../components/Driver/driver';
import DashBoard from '../components/DashBoard';


const { Content } = Layout

export default class Contents extends React.Component {
  render() {
    return (
      <Content className="content" id="content">
        <Switch>
        <Route exact path="/admin" component={DashBoard} />
        <Route exact path="/admin/driver" component={Driver} />
        </Switch>
      </Content>
    )
  }
}