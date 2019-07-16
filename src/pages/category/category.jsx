import React, { Component } from 'react'
import { Card, Table, Button, Icon} from 'antd'
import LinkButton from '../../components/link-button'

class Category extends Component {

    render() {
        // card 左侧标题
        const title = '一级分类标题'
        // card 右侧
        const extra = (
            <Button type="primary">
                <Icon type="plus"/>
                增加
            </Button>

        )
        const dataSource = [
            {
                "parentId": "0",
                "_id": '5ca9dffsafsa',
                "name": "家用电器",
                "_v": 0
            },
            {
                "parentId": "0",
                "_id": '5ca9dffsdfasdfsvcs',
                "name": "电脑",
                "_v": 0
            },
            {
                "parentId": "0",
                "_id": '5ca9dffesfwefwe',
                "name": "手机",
                "_v": 0
            }
        ];

        const columns = [
            {
                title: '分类名称',
                dataIndex: 'name' // 显示数据对应的属性名
            },
            {
                title: '操作',
                width: 300,
                align: 'center',
                render: () => ( // 返回需要显示的界面标签
                    <span>
                        <LinkButton>修改分类</LinkButton>
                        <LinkButton>查看子分类</LinkButton>
                    </span>
                )
            },
        ];


        return (
            <Card title={title} extra={extra}>
                <Table
                    bordered
                    rowKey='_id'
                    dataSource={dataSource}
                    columns={columns} />
            </Card>
         );
    }
}
 
export default Category;