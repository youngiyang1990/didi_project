import React from 'react'
import { Form, Input, Button, notification, Icon,message } from 'antd'
import createHistory from 'history/createHashHistory'
import Auth from '../../utils/auth'
import { constants } from 'zlib';
import './login.less'
const FormItem = Form.Item
const history = createHistory()

class LoginPage extends React.Component {
    constructor() {
        super()
    }

    handleSubmit = (e) => {
      e.preventDefault()
      let n = this.props.form.getFieldsValue().username
      let p = this.props.form.getFieldsValue().password
      Auth.login(n,p,()=>{
         message.success('登录成功')
        this.props.history.push("/admin");
       })
    }

    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <div className="loginpagewrap">
                <div className="box">
                    <p style={{textAlign:'center'}}>欢迎使用成绩查询后台系统</p>
                    <div className="loginWrap">
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem>
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: '请输入用户名' }],
                                })(
                                    <Input  />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: '请输入密码' }],
                                })(
                                    <Input type="password" />
                                )}
                            </FormItem>
                            <Button type="primary" htmlType="submit" className="loginBtn">Login</Button>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

let Login = Form.create()(LoginPage)
export default Login