import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Select, Input} from 'antd'
const Item = Form.Item
const Option = Select.Option

class AddForm extends Component {

    static propTypes = {
        parentId: PropTypes.string.isRequired,
        categorys: PropTypes.array.isRequired,
        setForm: PropTypes.func.isRequired,
    }

    componentWillMount() {
        // 将form对象通过setForm()传递父组件
        // 这样父组件就可以form 的封装方法  获取form 中的值了
        this.props.setForm(this.props.form)
    }

    render() {
        const { parentId, categorys } = this.props
        // 获取数据
        const { getFieldDecorator } = this.props.form

        return (
            <Form className="add-form">
                <Item label='所属分类：'>
                    {getFieldDecorator('parentId', {
                        initialValue: parentId,
                        rules: [{ required: true}],
                    })(
                        <Select>
                            {/*  这里犯错  箭头函数  如果使用了 {} 就得return ,否则就不要*/}
                            <Option value='0' key='0'>一级分类</Option>
                            {
                                categorys.map(c => {
                                    return <Option value={c._id} key={c._id}>{c.name}</Option>
                                })
                            }
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