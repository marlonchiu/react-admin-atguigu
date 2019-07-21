import React, { Component } from 'react'
import {
    Card,
    Button,
    Table,
    Modal,
    message
} from 'antd'
import {formateDate} from "../../utils/dateUtils"
import LinkButton from "../../components/link-button/index"
import {PAGE_SIZE} from "../../utils/constants"
import UserForm from './user-form'
import { reqUsers, reqDeleteUser, reqAddOrUpdateUser } from '../../api'

class User extends Component {
    state = {
        users: [], // 所有用户列表
        roles: [], // 所有角色列表
        isShow: false, // 是否显示确认框
    }

    initColumns = () => {
        this.columns = [
            {
                title: '用户名',
                dataIndex: 'username'
            },
            {
                title: '邮箱',
                dataIndex: 'email'
            },
            {
                title: '电话',
                dataIndex: 'phone'
            },
            {
                title: '注册时间',
                dataIndex: 'create_time',
                render: formateDate
            },
            {
                title: '所属角色',
                dataIndex: 'role_id',
                render: (role_id) => this.roleNames[role_id]
            },
            {
                title: '操作',
                render: (user) => (
                    <span>
                        <LinkButton onClick={() => this.showUpdate(user)}>修改</LinkButton>
                        <LinkButton onClick={() => this.deleteUser(user)}>删除</LinkButton>
                    </span>
                )
            }
        ]
    }

    // 根据role的数组, 生成包含所有角色名的对象(属性名用角色id值)
    initRoleNames = (roles) => {
        const roleNames = roles.reduce((pre, role) => {
            pre[role._id] = role.name
            return pre
        },{})
        // 保存
        this.roleNames = roleNames
    }


    // 显示添加界面
    showAdd = () => {
        this.user = null // 去除前面保存的user
        this.setState({isShow: true})
    }

    // 删除指定用户
    deleteUser = (user) => {
        Modal.confirm({
            title: `确认删除${user.username}吗?`,
            onOk: async () => {
                const result = await reqDeleteUser(user._id)
                if(result.status === 0) {
                    message.success('删除用户成功!')
                    this.getUsers()
                }
            }
        })
    }

    // 显示修改界面
    showUpdate = (user) => {
        this.user = user // 保存user
        this.setState({
            isShow: true
        })
    }

    getUsers = async () => {
        const result = await reqUsers()
        if (result.status === 0) {
            const {users, roles} = result.data
            this.initRoleNames(roles)
            this.setState({
                users,
                roles
            })
        }
    }

    // 添加或者更新用户
    addOrUpdateUser = () => {

    }

    componentDidMount () {
        this.getUsers()
    }

    componentWillMount () {
        this.initColumns()
    }

    render() {
        const {users, roles, isShow} = this.state
        const user = this.user || {}  // 防止为null

        const title = <Button type='primary' onClick={this.showAdd}>创建用户</Button>
        return (
            <Card title={title}>
                <Table
                    bordered
                    rowKey='_id'
                    dataSource={users}
                    columns={this.columns}
                    pagination={{defaultPageSize: PAGE_SIZE, showQuickJumper: true}}
                />

                <Modal
                    title={user._id ? '修改用户' : '添加用户'}
                    visible={isShow}
                    onOk={this.addOrUpdateUser}
                    onCancel={() => {
                        // this.form.resetFields()
                        this.setState({isShow: false})
                    }}
                >
                    <UserForm
                        setForm={form => this.form = form}
                        roles={roles}
                        user={user}
                    />
                </Modal>
            </Card>
         )
    }
}
 
export default User;