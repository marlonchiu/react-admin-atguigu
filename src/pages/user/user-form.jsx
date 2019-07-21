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

    /*
        对密码进行自定义验证
         用户名/密码的的合法性要求
             1). 必须输入
             2). 必须大于等于4位
             3). 必须小于等于12位
             4). 必须是英文、数字或下划线组成
    */
    validatePwd = (rule, value, callback) => {
        // console.log(value, rule)
        const pwdLen = value && value.length
        const pwdReg = /^[a-zA-Z0-9_]+$/
        if (!value) {
            callback('必须输入密码')
        } else if (pwdLen < 4) {
            callback('密码必须大于4位')
        } else if (pwdLen > 16) {
            callback('密码必须小于 16 位')
        } else if (!pwdReg.test(value)) {
            callback('密码必须是英文、 数组或下划线组成')
        } else {
            callback() // 必须调用 callback
        }

        // 语法
        // callback() // 验证通过
        // callback('xxxx') // 验证失败, 并指定提示的文本
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
                        rules: [
                            { required: true, message: '用户名必须输入!' },
                            { min: 4, message: '用户名至少4位' },
                            { max: 12, message: '用户名最多12位' },
                            { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' }
                        ],
                    })(
                        <Input placeholder="请输入用户名称"/>,
                    )}
                </Item>
                {/*  如果修改用户不操作密码  */}
                {
                    user._id ? null : (
                        <Item label='密码'>
                            {
                                getFieldDecorator('password', {
                                    initialValue: user.password,
                                    rules: [
                                        { required: true, message: '请输入密码!' },
                                        // 使用自定义的验证规则
                                        { validator: this.validatePwd }
                                    ],
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
                        rules: [
                            { required: true, message: '请输入手机号' },
                            { len: 11, message: '电话号码要满足11位' },
                            { pattern: /^1[3456789]\d{9}$/, message: '电话号码不符合要求' }
                        ],
                    })(
                        <Input placeholder="请输入手机号"/>,
                    )}
                </Item>
                <Item label='邮箱：'>
                    {getFieldDecorator('email', {
                        initialValue: user.email,
                        rules: [
                            { required: true, message: '请输入邮箱' },
                            { pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '邮箱格式不符合要求' }
                        ],
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