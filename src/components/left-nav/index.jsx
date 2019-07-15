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
                    mode="inline"
                    theme="dark"
                >
                    <Menu.Item key="/home">
                        <Link to='/home'>
                            <Icon type="home" />
                            <span>首页</span>
                        </Link>
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
                        <Menu.Item key="/category">
                            <span>
                                <Link to='/category'>
                                    <Icon type="bars" />
                                    <span>品类管理</span>
                                </Link>

                            </span>
                        </Menu.Item>
                        <Menu.Item key="/product">
                            <span>
                                <Link to='/product'>
                                   <Icon type="tool" />
                                    <span>商品管理</span>
                                </Link>
                            </span>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="/user">
                        <Link to='/user'>
                            <Icon type="user" />
                            <span>用户管理</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/role">
                        <Link to='/role'>
                            <Icon type="safety" />
                            <span>角色管理</span>
                        </Link>
                    </Menu.Item>
                    <SubMenu
                        key="sub12"
                        title={
                            <span>
                                <Icon type="area-chart" />
                                <span>图形图表</span>
                            </span>
                        }
                    >
                        <Menu.Item key="/charts/bar">
                            <span>
                                <Link to='/charts/bar'>
                                    <Icon type="bar-chart" />
                                    <span>柱形图</span>
                                </Link>
                            </span>
                        </Menu.Item>
                        <Menu.Item key="/charts/line">
                            <span>
                                <Link to='/charts/line'>
                                   <Icon type="line-chart" />
                                    <span>折线图</span>
                                </Link>
                            </span>
                        </Menu.Item>
                        <Menu.Item key="/charts/pie">
                            <span>
                                <Link to='/charts/pie'>
                                   <Icon type="pie-chart" />
                                    <span>饼图</span>
                                </Link>
                            </span>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
         )
    }
}
 
export default LeftNav