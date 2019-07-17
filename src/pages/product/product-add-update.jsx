import React, { Component } from 'react'
import LinkButton from '../../components/link-button'
import {
    Card,
    Icon,
    Form,
    Input,
    Cascader,
    Button,
    message
} from 'antd'
const { Item } = Form
const { TextArea } = Input

const options = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        isLeaf: false,
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        isLeaf: false,
    }
]

class ProductAddUpdate extends Component {
    state = {
        options,
    }

    onChange = (value, selectedOptions) => {
        console.log(value, selectedOptions);
    }

    /*
        用加载下一级列表的回调函数
   */
    loadData = selectedOptions => {
        // 得到选择的option对象
        const targetOption = selectedOptions[selectedOptions.length - 1];

        // 显示loading效果
        targetOption.loading = true;

        // load options lazily
        setTimeout(() => {
            targetOption.loading = false;
            targetOption.children = [
                {
                    label: `${targetOption.label} Dynamic 1`,
                    value: 'dynamic1',
                },
                {
                    label: `${targetOption.label} Dynamic 2`,
                    value: 'dynamic2',
                },
            ];
            this.setState({
                options: [...this.state.options],
            });
        }, 1000);
    };

    // 验证价格的自定义验证函数
    validatePrice = (rule, value, callback) => {
        // console.log(value, typeof value)
        if(value * 1 > 0) {
            callback() // 验证通过
        }else {
            callback('价格必须大于0') // 验证没通过
        }
    }


    render() {

        const {getFieldDecorator} = this.props.form

        // 指定Item布局的配置对象
        const formItemLayout = {
            labelCol: { span: 2 },  // 左侧label的宽度
            wrapperCol: { span: 8 }, // 右侧包裹的宽度
        }

        const title = (
            <span>
                <LinkButton>
                  <Icon
                      type='arrow-left'
                      style={{marginRight: 10, fontSize: 20}}
                      onClick={() => this.props.history.goBack()}
                  />
                </LinkButton>
            <span>添加商品</span>
            </span>
        )

        return ( 
            <Card title={title}>
                <Form {...formItemLayout}>
                    <Item label="商品名称">
                        {
                            getFieldDecorator('name', {
                                initialValue: '',
                                rules: [
                                    {required: true, message: '必须输入商品名称'}
                                ]
                            })(<Input placeholder='请输入商品名称'/>)
                        }
                    </Item>
                    <Item label="商品描述">
                        {
                            getFieldDecorator('desc', {
                                initialValue: '',
                                rules: [
                                    {required: true, message: '必须输入商品描述'}
                                ]
                            })(<TextArea placeholder="请输入商品描述" autosize={{ minRows: 2, maxRows: 6 }} />)
                        }
                    </Item>
                    <Item label="商品价格">
                        {
                            getFieldDecorator('price', {
                                initialValue: '',
                                rules: [
                                    {required: true, message: '必须输入商品价格'},
                                    {validator: this.validatePrice}
                                ]
                            })(<Input type='number' placeholder='请输入商品价格' addonAfter='元'/>)
                        }
                    </Item>

                    <Item label="商品分类">
                        <Cascader
                            placeholder='请指定商品分类'
                            options={this.state.options}  /*需要显示的列表数据数组*/
                            loadData={this.loadData}  /*当选择某个列表项, 加载下一级列表的监听回调*/
                            onChange={this.onChange}
                            changeOnSelect
                        />
                    </Item>
                    <Item label="商品图片">
                        <div>商品图片</div>
                    </Item>
                    <Item label="商品详情">
                        <div>商品详情</div>
                    </Item>
                    <Item>
                        <Button type='primary' onClick={this.handleSubmit}>提交</Button>
                    </Item>
                </Form>
            </Card>
         );
    }

    handleSubmit = () => {
        this.props.form.validateFields((error, values) => {
            if(!error) {
                // 发送请求
                console.log(values)

                message.error('数据获取失败')
            }
        })
    }
}
 
export default Form.create()(ProductAddUpdate)