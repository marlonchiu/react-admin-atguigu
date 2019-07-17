import React, { Component } from 'react'
import LinkButton from '../../components/link-button'
import { reqProducts, reqSearchProducts, reqUpdateStatus } from '../../api'
import { PAGE_SIZE } from '../../utils/constants'
import './product.less'

import {
    Card,
    Select,
    Input,
    Button,
    Icon,
    Table,
    message
} from 'antd'
const { Option } = Select


// Product的默认子路由组件
class ProductHome extends Component {

    state = {
        total: 0, // 商品的总数量
        products: [], // 商品的数组
        loading: false, // 是否正在加载中
        searchName: '', // 搜索的关键字
        searchType: 'productName' // 根据哪个字段搜索
    }

    // 初始化table的列数组
    initColumns = () => {
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name'
            },
            {
                title: '商品描述',
                dataIndex: 'desc'
            },
            {
                title: '价格',
                dataIndex: 'price',
                render: (price) => '¥' + price  // 当前指定了对应的属性, 传入的是对应的属性值
            },
            {
                width: 100,
                title: '状态',
                render: (product) => {
                    // console.log(product)
                    const { status, _id } = product
                    const newStatus = status === 1 ? 2 : 1
                    return (
                        <span>
                            <Button type='primary' onClick={() => this.updateStatus(_id, newStatus)}>{status === 1 ? '下架' : '上架'}</Button>
                            <span>{status === 1 ? '在售' : '已下架'}</span>
                        </span>
                    )
                }
            },
            {
                width: 100,
                title: '操作',
                render: (product) => {
                    return (
                        <span>
                            {/*将product对象使用state传递给目标路由组件*/}
                            <LinkButton onClick={() => this.props.history.push('/product/detail', {product})}>详情</LinkButton>
                            <LinkButton>修改</LinkButton>
                        </span>
                    )
                }
            },
        ];
    }

    getProducts = async(pageNum) => {
        this.pageNum = pageNum // 保存pageNum, 让其它方法可以看到(更新商品状态会用到)

        this.setState({loading: true}) // 显示loading
        
        const {searchName, searchType} = this.state
        // console.log(searchName, searchType)
        // 如果搜索关键字有值, 说明我们要做搜索分页
        let result

        if(searchName) {
            result = await reqSearchProducts({
                pageNum,
                pageSize: PAGE_SIZE,
                searchType,
                searchName
            })
        } else {
            result = await reqProducts({
                pageNum,
                pageSize: PAGE_SIZE
            })
        }

        this.setState({loading: false}) // 隐藏loading

        if (result.status === 0) {
            // console.log(result.data)
            // 取出分页数据, 更新状态, 显示分页列表
            const {total, list} = result.data
            this.setState({
                total,
                products: list
            })
        } else {
            message.error(result.msg)
        }

    }

    // 更新指定商品的状态
    updateStatus = async(productId, status) => {
        const result = await reqUpdateStatus(productId, status)
        if(result.status=== 0) {
            message.success('更新商品成功')
            this.getProducts(this.pageNum)
        }
    }

    // 执行异步任务: 发异步ajax请求
    componentDidMount () {
        // 获取一级分类列表显示
        this.getProducts(1)
    }

    // 为第一次render()准备数据
    componentWillMount () {
        this.initColumns()
    }

    render() {

        const  { total, products, loading, searchName, searchType } = this.state

        // card 左侧标题
        const title = (
            <span>
                <Select
                    value= {searchType}
                    style={{width: 150}}
                    onChange={value => this.setState({searchType: value})}
                >
                    <Option value='productName'>按名称搜索</Option>
                    <Option value='productDesc'>按描述搜索</Option>
                </Select>
                <Input
                    placeholder='关键字'
                    value={searchName}
                    style={{width: 150, margin: '0 15px'}}
                    onChange={(event) => this.setState({searchName: event.target.value})}
                />
                <Button type='primary' onClick={() => this.getProducts(1)}>搜索</Button>
            </span>
        )

        // card 右侧
        const extra = (
            <Button type="primary" onClick={() => this.props.history.push('/product/addupdate')}>
                <Icon type="plus"/>
                增加商品
            </Button>
        )

        return (
            <Card title={title} extra={extra}>
                <Table
                    bordered
                    rowKey='_id'
                    loading={loading}
                    columns={this.columns}
                    dataSource={products}
                    pagination={{
                        current: this.pageNum,
                        total,
                        defaultPageSize: PAGE_SIZE,
                        showQuickJumper: true,
                        onChange: this.getProducts  // 等价于 (pageNum) => this.getProducts(pageNum)
                    }}/>
            </Card>
         );
    }

}
 
export default ProductHome;