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
import {reqRoles, reqAddRole} from '../../api'
import AddForm from './add-form'

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
            const roles = result.data
            // const roles = [
            //     {
            //         "menus": ["/home", "/products","category","role"],
            //         "_id": 177474952450235,
            //         "name": "角色A",
            //         "_v": 0,
            //         "create_time":1554639552758,
            //         "auth_time":1557630307021,
            //         "auth_name": "admin"
            //     },
            //     {
            //         "menus": ["/home", "/products","category","role"],
            //         "_id": 177474952650235,
            //         "name": "经理",
            //         "_v": 0,
            //         "create_time":1554639553456,
            //         "auth_time":1557630307021,
            //         "auth_name": "admin"
            //     },
            // ]
            this.setState({
                roles
            })
        }
    }


    // 添加角色
    addRole = () => {
        this.form.validateFields(async (err, values) => {
            if (!err) {
                // 0 关闭窗口
                this.setState({
                    isShowAdd: false
                })
                // 收集数据
                const { roleName } = values
                
                // 清除输入数据（否则修改时会利用缓存的）
                this.form.resetFields()

                // 2 发起请求更新分类
                const result = await reqAddRole(roleName)
                if (result.status === 0) {
                    message.success('添加角色成功')
                    // this.getRoles()

                    // 新产生的角色
                    const role = result.data
                    // 更新roles状态
                    /*const roles = this.state.roles
                    roles.push(role)
                    this.setState({
                      roles
                    })*/

                    // 更新roles状态: 基于原本状态数据更新
                    this.setState(state => ({
                        roles: [...state.roles, role]
                    }))
                } else {
                    message.error(result.msg)
                }
            }
        });
    }

    componentWillMount() {
        this.initColumn()
    }

    componentDidMount() {
        this.getRoles()
    }

    render() {
        const {roles, role, isShowAdd} = this.state

        const title = (
            <span>
                <Button type='primary' onClick={() => this.setState({isShowAdd: true})}>创建角色</Button> &nbsp;&nbsp;
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


                <Modal
                    title="添加角色"
                    visible={isShowAdd}
                    onCancel={() => {
                        this.setState({
                            isShowAdd: false
                        })
                        this.form.resetFields()
                    }}
                    onOk={this.addRole}
                >
                    <AddForm
                        setForm={(form) => {this.form = form}}
                    />
                </Modal>
            </Card>
        );
    }
}

export default Role;