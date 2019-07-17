import React, { Component } from 'react'
import LinkButton from '../../components/link-button'
import { reqProducts } from '../../api'
import { PAGE_SIZE } from '../../utils/constants'

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
        products: [
            {
                _id: '1',
                name: 'John Brown',
                price: 32,
                desc: 'New York No. 1 Lake Park',
                status: 0,
            },
            {
                _id: '2',
                name: 'Jim Green',
                price: 42,
                desc: 'London No. 1 Lake Park',
                status: 1,
            }
        ], // 商品的数组
        loading: false, // 是否正在加载中
        searchName: '', // 搜索的关键字
        searchType: 'productName', // 根据哪个字段搜索
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
                    const { status } = product
                    return (
                        <span>
                            <Button type='primary'>{status === 1 ? '下架' : '上架'}</Button>
                            <span>{status === 1 ? '在售' : '已下架'}</span>
                        </span>
                    )
                }
            },
            {
                width: 100,
                title: '操作',
                render: () => {
                    return (
                        <span>
                            <LinkButton>详情</LinkButton>
                            <LinkButton>修改</LinkButton>
                        </span>
                    )
                }
            },
        ];
    }

    getProducts = async(pageNum) => {
        this.pageNum = pageNum // 保存pageNum, 让其它方法可以看到
        this.setState({loading: true}) // 显示loading
        const result = await reqProducts({
            pageNum,
            pageSize: PAGE_SIZE
        })
        this.setState({loading: false}) // 显示loading

        if (result.status === 0) {
            console.log(result.data)
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
                <Select dvalue= {searchType} style={{width: 150}}>
                    <Option value='productName'>按名称搜索</Option>
                    <Option value='productDesc'>按描述搜索</Option>
                </Select>
                <Input
                    placeholder='关键字'
                    value={searchName}
                    style={{width: 150, margin: '0 15px'}}
                />
                <Button type='primary'>搜索</Button>
            </span>
        )

        // card 右侧
        const extra = (
            <Button type="primary">
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
                        onChange: this.getProducts
                    }}/>
            </Card>
         );
    }
}
 
export default ProductHome;