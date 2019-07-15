import React, { Component } from 'react'
import { Link} from 'react-router-dom';
import './index.less'
import logo from '../../assets/images/logo.png'

import { Menu, Icon } from 'antd'
const { SubMenu } = Menu

class LeftNav extends Component {
    render() { 
        return (
            <div to='/' className='left-nav'>
                <Link to='/' className='left-nav-header'>
                    <img src={logo} alt="logo"/>
                    <h1>硅谷后台</h1>
                </Link>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                >
                    <Menu.Item key="1">
                        <Icon type="home" />
                        <span>首页</span>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                                <Icon type="appstore" />
                                <span>商品</span>
                            </span>
                        }
                    >
                        <Menu.Item key="5">
                            <span>
                                <Icon type="bars" />
                                <span>品类管理</span>
                            </span>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <span>
                                <Icon type="tool" />
                                <span>商品管理</span>
                            </span>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
         )
    }
}
 
export default LeftNav