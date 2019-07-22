import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import menuList from '../../config/menuConfig'

import { Form, Input, Tree} from 'antd'
const {Item} = Form
const { TreeNode } = Tree

class AuthForm extends PureComponent {

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

    // 根据新传入的role来更新checkedKeys状态
    /*
    当组件接收到新的属性时自动调用
     */
    // 如果不优化
    //     1. 点击取消会记录上次的选择但是我们是没有选中的
    //     2. 点击选择其他角色是  所有的默认角色还是第一次选择的那个  视频 92
    componentWillReceiveProps (nextProps) {
        console.log('componentWillReceiveProps()', nextProps)
        const menus = nextProps.role.menus
        this.setState({
            checkedKeys: menus
        })
        // 这种方式也可以在此处
        // this.state.checkedKeys = menus
    }

    render() {
        console.log('AuthForm render()')
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