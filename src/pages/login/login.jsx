import React, { Component } from 'react'
import logo from '../../assets/images/logo.png'
import './login.less'
import {
    Form,
    Input,
    Icon,
    Button,
    } from 'antd'

// const Item = Form.Item // 不能写在import 之前

// 用户登陆的路由组件
class Login extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    render() {
        // this.props.form 得到具备强大功能的form 对象
        const { getFieldDecorator } = this.props.form

        return ( 
            <div className='login'>
                <header className='login-header'>
                    <img src={logo} alt="logo"/>
                    <h1>React 项目: 后台管理系统</h1>
                </header>
                <section className='login-content'>
                    <h3>用户登陆</h3>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                          {
                              getFieldDecorator('username', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                              })(
                                <Input
                                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                  placeholder="Username"
                                />
                              )
                          }
                        </Form.Item>
                        <Form.Item>
                          {
                              getFieldDecorator('PASSWORD', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                              })(
                                <Input
                                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                  type="password"
                                  placeholder="Password"
                                />,
                              )
                          }

                            {/*<Input*/}
                                {/*prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}*/}
                                {/*type="password"*/}
                                {/*placeholder="Password"*/}
                                {/*/>*/}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
         )
    }

    handleSubmit(e) {
        // 阻止事件默认行为(不提交表单)
        e.preventDefault()
        const form = this.props.form
        const values = form.getFieldsValue()
        console.log(values)
    }
}

/*
* 高阶函数
*   Form.create()
* 高阶组件
*   Form.create() 包装Form组件生成一个新的组件Form(Login) 可以通过react dev tools 查看
*   新组件会向Form组件传递一个强大的对象属性 form
* */
// export default Login
const WrappedLoginForm = Form.create({ name: 'normal_login' })(Login)
export default WrappedLoginForm

/*
    前台表单验证，收据收集

    用户名/密码的合法性要求：
        用户名/密码的的合法性要求
        1). 必须输入
        2). 必须大于等于 4 位
        3). 必须小于等于 12 位
        4). 必须是英文、 数字或下划线组成
 */