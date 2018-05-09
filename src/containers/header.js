import React from 'react'
import { Menu, Icon, Layout,message} from 'antd'
import { Link } from 'react-router-dom'
import './header.less'
import Auth from '../utils/auth'

const SubMenu = Menu.SubMenu
const { Header } = Layout

export default class Top extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: ''
        }
    }

    componentDidMount() {
        this.getUser()
    }

    getUser = () => {
        this.setState({
            username: '超级管理员'
        })
    }

    clear = (item) => {
        if (item.key === 'logOut') {
            this.props.clear()
        }
    }
    logout(){
        Auth.logout(function(){
            message.success("登出成功")
        })
    }


    render() {
        return (
            <Header style={{ background: '#fff'}}>
                <Icon
                    className="trigger"
                    type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.props.toggle}
                />
                <Menu mode="horizontal" className="logOut"  style={{float:'right'}} onClick={this.clear}>
                    <SubMenu title={<span><Icon type="user" />{ this.state.username }</span>} >
                        <Menu.Item key="logOut"><Link to="/login" onClick={()=>this.logout()}  >退出</Link></Menu.Item>
                    </SubMenu>
                </Menu>

            </Header>
        )
    }
}