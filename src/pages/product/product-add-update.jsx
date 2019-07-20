import React, { Component } from 'react'
import LinkButton from '../../components/link-button'
import { reqCategorys } from '../../api'
import PicturesWall from './pictures-wall'
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
    constructor(props) {
        super(props)

        // 创建用来保存ref标识的标签对象的容器
        this.pw = React.createRef()
    }

    state = {
        options: [],
    }

    // 处理options 的通用方法
    initOptions = async (categorys) => {
        // 根据categorys生成options数组
        const options = categorys.map(c => ({
            value: c._id,
            label: c.name,
            isLeaf: false, // 不是叶子
        }))

        // 如果是一个二级分类商品的更新
        const {isUpdate, product} = this
        const {pCategoryId} = product

        if(isUpdate && pCategoryId !== '0') {
            // 获取对应的二级分类列表
            const subCategorys = await this.getCategorys(pCategoryId)

            // 生成二级下拉列表的options
            const childrenOptions = subCategorys.map(sub => ({
                value: sub._id,
                label: sub.name,
                isLeaf: true
            }))

            // 找到当前商品对应的一级option 对象
            const targetOption = options.find(option => option.value === pCategoryId)

            // 关联对应的一级option上
            targetOption.children = childrenOptions
        }

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
        const targetOption = selectedOptions[selectedOptions.length - 1]
        // console.log(targetOption)
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

    componentWillMount () {
        // 取出携带的state
        const product = this.props.location.state  // 如果是添加没值, 否则有值
        // console.log(product)
        console.log(!!product)
        // 保存是否是更新的标识
        this.isUpdate = !!product
        // 保存商品(如果没有, 保存是{})
        this.product = product || {}
    }

    componentDidMount() {
        // 获取分类列表  初始化时一级的
        this.getCategorys('0')
    }


    render() {
        const { isUpdate, product } = this
        // pCategoryId 一级id  categoryId  二级id
        const {pCategoryId, categoryId} = product

        // 用来接收级联分类ID的数组
        const categoryIds = []
        if(isUpdate) {
            // 商品是一个一级分类的商品
            if(pCategoryId === '0') {
                categoryIds.push(categoryId)
            } else {
                // 商品是一个二级分类的商品
                categoryIds.push(pCategoryId)
                categoryIds.push(categoryId)
            }
        }


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
            <span>{ isUpdate ? '修改商品' : '添加商品'}</span>
            </span>
        )

        return ( 
            <Card title={title}>
                <Form {...formItemLayout}>
                    <Item label="商品名称">
                        {
                            getFieldDecorator('name', {
                                initialValue: product.name,
                                rules: [
                                    {required: true, message: '必须输入商品名称'}
                                ]
                            })(<Input placeholder='请输入商品名称'/>)
                        }
                    </Item>
                    <Item label="商品描述">
                        {
                            getFieldDecorator('desc', {
                                initialValue: product.desc,
                                rules: [
                                    {required: true, message: '必须输入商品描述'}
                                ]
                            })(<TextArea placeholder="请输入商品描述" autosize={{ minRows: 2, maxRows: 6 }} />)
                        }
                    </Item>
                    <Item label="商品价格">
                        {
                            getFieldDecorator('price', {
                                initialValue: product.price,
                                rules: [
                                    {required: true, message: '必须输入商品价格'},
                                    {validator: this.validatePrice}
                                ]
                            })(<Input type='number' placeholder='请输入商品价格' addonAfter='元'/>)
                        }
                    </Item>

                    <Item label="商品分类">
                        {
                            getFieldDecorator('categoryIds', {
                                initialValue: categoryIds,
                                rules: [
                                    {required: true, message: '必须请指定商品分类'}
                                ]
                            })(<Cascader
                                placeholder='请指定商品分类'
                                options={this.state.options}  /*需要显示的列表数据数组*/
                                loadData={this.loadData}  /*当选择某个列表项, 加载下一级列表的监听回调*/
                            />)
                        }
                    </Item>
                    <Item label="商品图片">
                        <PicturesWall ref={this.pw}>商品图片</PicturesWall>
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
                // 获取imgs 的名字数组
                const imgs = this.pw.current.getImgs()
                console.log('imgs', imgs)

                message.error('数据获取失败')
            }
        })
    }
}
 
export default Form.create()(ProductAddUpdate)


/*
1. 子组件调用父组件的方法: 将父组件的方法以函数属性的形式传递给子组件, 子组件就可以调用
2. 父组件调用子组件的方法: 在父组件中通过ref得到子组件标签对象(也就是组件对象), 调用其方法
 */

/*
使用ref
1. 创建ref容器: thi.pw = React.createRef()
2. 将ref容器交给需要获取的标签元素: <PictureWall ref={this.pw} />
3. 通过ref容器读取标签元素: this.pw.current
 */