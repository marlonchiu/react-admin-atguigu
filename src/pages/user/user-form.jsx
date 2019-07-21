import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select} from 'antd'
const Item = Form.Item
const Option = Select.Option

class UserForm extends PureComponent {

    static propTypes = {
        setForm: PropTypes.func.isRequired,  // 用来传递form对象的函数
        roles: PropTypes.array.isRequired,
        user: PropTypes.object
    }

    componentWillMount() {
        // 将form对象通过setForm()传递父组件
        // 这样父组件就可以form 的封装方法  获取form 中的值了
        this.props.setForm(this.props.form)
    }

    render() {
        const {roles, user} = this.props

        // 获取数据
        const { getFieldDecorator } = this.props.form
        // 指定Item布局的配置对象
        const formItemLayout = {
            labelCol: { span: 6 },  // 左侧label的宽度
            wrapperCol: { span: 15 }, // 右侧包裹的宽度
        }

        return (
            <Form {...formItemLayout} className="user-form">
                <Item label='用户名称：'>
                    {getFieldDecorator('username', {
                        initialValue: user.username,
                        rules: [{ required: true, message: '请输入用户名' }],
                    })(
                        <Input placeholder="请输入角色名称"/>,
                    )}
                </Item>
                {/*  如果修改用户不操作密码  */}
                {
                    user._id ? null : (
                        <Item label='密码'>
                            {
                                getFieldDecorator('password', {
                                    initialValue: user.password,
                                })(
                                    <Input type='password' placeholder='请输入密码'/>
                                )
                            }
                        </Item>
                    )
                }
                <Item label='手机号码：'>
                    {getFieldDecorator('phone', {
                        initialValue: user.phone,
                        rules: [{ required: true, message: '请输入手机号' }],
                    })(
                        <Input placeholder="请输入手机号"/>,
                    )}
                </Item>
                <Item label='邮箱：'>
                    {getFieldDecorator('email', {
                        initialValue: user.email,
                        rules: [{ required: true, message: '请输入邮箱' }],
                    })(
                        <Input placeholder="请输入邮箱"/>,
                    )}
                </Item>
                <Item label='角色：'>
                    {
                        getFieldDecorator('role_id', {
                            initialValue: user.role_id,
                        })(
                            <Select placeholder="请选择角色">
                                {
                                    roles.map(role =>
                                        <Option
                                            key={role._id}
                                            value={role._id}
                                        >{role.name}</Option>)
                                }
                            </Select>
                        )
                    }
                </Item>
            </Form>
        )
    }
}

export default Form.create({ name: 'user_form' })(UserForm)