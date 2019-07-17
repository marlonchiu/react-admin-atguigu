import React, { Component } from 'react'

import { Form, Select, Input} from 'antd'
const Item = Form.Item
const Option = Select.Option

class AddForm extends Component {
    render() {
        const { getFieldDecorator } = this.props.form

        return (
            <Form className="add-form">
                <Item label='所属分类：'>
                    {getFieldDecorator('parentId', {
                        initialValue: '0',
                        rules: [{ required: true}],
                    })(
                        <Select>
                            <Option value='0'>一级分类</Option>
                            <Option value="1">Option 1</Option>
                            <Option value="2">Option 2</Option>
                            <Option value="3">Option 3</Option>
                        </Select>
                    )}
                </Item>
                <Item label='分类名称：'>
                    {getFieldDecorator('categoryName', {
                        initialValue: '',
                        rules: [{ required: true, message: '分类名称必须输入' }],
                    })(
                        <Input placeholder="请输入分类名称"/>,
                    )}
                </Item>
            </Form>
        )
    }
}

export default Form.create({ name: 'add_form' })(AddForm)