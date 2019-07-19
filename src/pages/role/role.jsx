import React, { Component } from 'react'
import {
    Card,
    Button,
    Table,
    Modal,
    message
} from 'antd'
import {formateDate} from '../../utils/dateUtils'
import { PAGE_SIZE } from '../../utils/constants'
import { reqRoles } from '../../api'

class Role extends Component {

    state = {
        roles: [], // 所有角色的列表
        role: {}, // 选中的role
        isShowAdd: false, // 是否显示添加界面
        isShowAuth: false, // 是否显示设置权限界面
    }

    initColumn = () => {
        this.columns = [
            {
                title: '角色名称',
                dataIndex: 'name'
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                render: (create_time) => formateDate(create_time)
            },
            {
                title: '授权时间',
                dataIndex: 'auth_time',
                render: formateDate
            },
            {
                title: '授权人',
                dataIndex: 'auth_name'
            }
        ]
    }

    onRow = (role) => {
        return {
            onClick: event => { // 点击确认行
                this.setState({
                    role
                })
            }
        }
    }

    getRoles = async () => {
        const result = await reqRoles()
        if(result.status === 0) {
            // const roles = result.data
            const roles = [
                {
                    "menus": ["/home", "/products","category","role"],
                    "_id": 177474952450235,
                    "name": "角色A",
                    "_v": 0,
                    "create_time":1554639552758,
                    "auth_time":1557630307021,
                    "auth_name": "admin"
                },
                {
                    "menus": ["/home", "/products","category","role"],
                    "_id": 177474952650235,
                    "name": "经理",
                    "_v": 0,
                    "create_time":1554639553456,
                    "auth_time":1557630307021,
                    "auth_name": "admin"
                },
            ]
            this.setState({
                roles
            })
        }
    }


    componentWillMount() {
        this.initColumn()
    }

    componentDidMount() {
        this.getRoles()
    }

    render() {
        const {roles, role} = this.state

        const title = (
            <span>
                <Button type='primary'>创建角色</Button> &nbsp;&nbsp;
                <Button type='primary' disabled={!role._id}>设置角色权限</Button>
            </span>
        )
        return (
            <Card title={title}>
                <Table
                    bordered
                    rowKey='_id'
                    dataSource={roles}
                    columns={this.columns}
                    pagination={{defaultPageSize: PAGE_SIZE}}
                    rowSelection={{
                        type: 'radio',
                        selectedRowKeys: [role._id],
                        onSelect: (role) => {   // 选择某个radio时回调
                            this.setState({
                                role
                            })
                        }
                    }}
                    onRow={this.onRow}
                />
            </Card>
        );
    }
}

export default Role;