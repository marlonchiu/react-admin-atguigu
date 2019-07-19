import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input} from 'antd'
const Item = Form.Item

class AddForm extends Component {

    static propTypes = {
        setForm: PropTypes.func.isRequired,
    }

    componentWillMount() {
        // 将form对象通过setForm()传递父组件
        // 这样父组件就可以form 的封装方法  获取form 中的值了
        this.props.setForm(this.props.form)
    }

    render() {
        // 获取数据
        const { getFieldDecorator } = this.props.form
        // 指定Item布局的配置对象
        const formItemLayout = {
            labelCol: { span: 6 },  // 左侧label的宽度
            wrapperCol: { span: 15 }, // 右侧包裹的宽度
        }

        return (
            <Form {...formItemLayout} className="add-form">
                <Item label='角色名称：'>
                    {getFieldDecorator('roleName', {
                        initialValue: '',
                        rules: [{ required: true, message: '角色名称必须输入' }],
                    })(
                        <Input placeholder="请输入角色名称"/>,
                    )}
                </Item>
            </Form>
        )
    }
}

export default Form.create({ name: 'add_form' })(AddForm)