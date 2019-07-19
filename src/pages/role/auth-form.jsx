import React, { Component } from 'react'
import PropTypes from 'prop-types'
import menuList from '../../config/menuConfig'

import { Form, Input, Tree} from 'antd'
const {Item} = Form
const { TreeNode } = Tree

class AuthForm extends Component {

    static propTypes = {
        role: PropTypes.object.isRequired,
    }

    getTreeNodes = (menuList) => {
        return menuList.reduce((pre, item) => {
            pre.push(
                <TreeNode title={item.title} key={item._id}>
                    {item.children ? this.getTreeNodes(item.children): null}
                </TreeNode>
            )
            return pre
        }, [])
    }

    componentWillMount() {
        // 递归获取 treeNode
        this.treeNodes = this.getTreeNodes(menuList)
    }

    render() {
        // 获取数据
        const { role } = this.props
        const { treeNodes } = this
        // 指定Item布局的配置对象
        const formItemLayout = {
            labelCol: { span: 4 },  // 左侧label的宽度
            wrapperCol: { span: 15 }, // 右侧包裹的宽度
        }

        return (
            <Form {...formItemLayout} className="add-form">
                <Item label='角色名称：'>
                    <Input placeholder="请输入角色名称" value={role.name} disabled/>
                </Item>
                <Tree
                    checkable
                    defaultExpandAll={true}
                >
                    <TreeNode title="平台权限" key="all">
                        {treeNodes}
                    </TreeNode>
                </Tree>
            </Form>
        )
    }
}

export default AuthForm