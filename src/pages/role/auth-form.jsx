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

    constructor(props) {
        super(props)
        // 根据传入角色的menus生成初始状态
        const {menus} = this.props.role
        this.state = {
            checkedKeys: menus  // 赋值后操作的都是 checkedKeys
        }
    }

    // 为父组件提交获取最新menus数据的方法
    getMenus = () => this.state.checkedKeys

    getTreeNodes = (menuList) => {
        return menuList.reduce((pre, item) => {
            pre.push(
                <TreeNode title={item.title} key={item.key}>
                    {item.children ? this.getTreeNodes(item.children): null}
                </TreeNode>
            )
            return pre
        }, [])
    }

    // 选中某个node时的回调
    onCheck = (checkedKeys) => {
        // console.log('onCheck', checkedKeys);
        this.setState({
            checkedKeys
        })
    }
    

    componentWillMount() {
        // 递归获取 treeNode
        this.treeNodes = this.getTreeNodes(menuList)
    }

    render() {
        // 获取数据
        const { role } = this.props
        const { checkedKeys } = this.state
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
                    checkedKeys={checkedKeys}
                    onCheck={this.onCheck}
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