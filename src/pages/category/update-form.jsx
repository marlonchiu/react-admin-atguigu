import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input} from 'antd'

const Item = Form.Item

class UpdateForm extends Component {

    static propTypes = {
        categoryName: PropTypes.string.isRequired,
        setForm: PropTypes.func.isRequired
    }

    componentWillMount() {
        // 将form对象通过setForm()传递父组件
        // 这样父组件就可以form 的封装方法  获取form 中的值了
        this.props.setForm(this.props.form)
    }


    render() {
        // 接收  this.props 中的值
        const { categoryName } = this.props
        const { getFieldDecorator } = this.props.form

        return (
            <Form className="update-form">
                <Item>
                    {getFieldDecorator('categoryName', {
                        initialValue: categoryName,
                        rules: [{ required: true, message: '分类名称必须输入' }],
                    })(
                        <Input placeholder="请修改分类名称"/>,
                    )}
                </Item>
            </Form>
        )
    }
}

export default Form.create({ name: 'update-form' })(UpdateForm)