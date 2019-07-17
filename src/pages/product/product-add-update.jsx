import React, { Component } from 'react'
import LinkButton from '../../components/link-button'
import { reqCategorys } from '../../api'
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

class ProductAddUpdate extends Component {
    state = {
        options: [],
    }

    // 处理options 的通用方法
    initOptions = (categorys) => {
        // 根据categorys生成options数组
        const options = categorys.map(c => ({
            value: c._id,
            label: c.name,
            isLeaf: false, // 不是叶子
        }))

        // 更新options状态
        this.setState({
            options
        })
    }

    // 异步获取 一级/ 二级分类列表
    //  async函数的返回值是一个新的promise对象, promise的结果和值由async的结果来决定
    getCategorys = async (parentId) => {
        const result = await reqCategorys(parentId)
        // debugger
        if(result.status === 0) {
            const categorys = result.data
            // 如果是一级列表
            if(parentId === '0') {
                this.initOptions(categorys)
            } else { // 二级列表
                return categorys  // 返回二级列表 ==> 当前async函数返回的promsie就会成功且value为categorys
            }
        }
    }

    /*
        用加载下一级列表的回调函数
   */
    loadData = async selectedOptions => {
        // 得到选择的option对象
        const targetOption = selectedOptions[selectedOptions.length - 1];
        console.log(targetOption)
        // 显示loading效果
        targetOption.loading = true

        // 根据选中的分类，请求获取二级分类列表
        const subCategorys = await this.getCategorys(targetOption.value)

        targetOption.loading = false

        // 判断二级分类列表 是否 有数据
        if (subCategorys && subCategorys.length > 0) {
            // 生成一个二级列表的 options
            const childrenOptions = subCategorys.map(sub => ({
                value: sub._id,
                label: sub.name,
                isLeaf: true
            }))
            // 关联到当前选中的option 上
            targetOption.children = childrenOptions

        } else { // 当前选中的分类没有二级分类
            targetOption.isLeaf = true
        }

        // 更新 options 状态
        this.setState({
            options: [...this.state.options]
        })
    }

    // 验证价格的自定义验证函数
    validatePrice = (rule, value, callback) => {
        // console.log(value, typeof value)
        if(value * 1 > 0) {
            callback() // 验证通过
        }else {
            callback('价格必须大于0') // 验证没通过
        }
    }

    componentDidMount() {
        // 获取分类列表  初始化时一级的
        this.getCategorys('0')
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