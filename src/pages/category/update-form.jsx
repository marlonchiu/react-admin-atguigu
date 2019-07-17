import React, { Component } from 'react'
import { Form, Input} from 'antd'

const Item = Form.Item

class UpdateForm extends Component {
    render() {
        const { getFieldDecorator } = this.props.form

        return (
            <Form className="update-form">
                <Item>
                    {getFieldDecorator('categoryName', {
                        initialValue: '',
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