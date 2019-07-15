import React, { Component } from 'react'
import { Link} from 'react-router-dom';
import './index.less'
import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig'

import { Menu, Icon } from 'antd'
const { SubMenu } = Menu

class LeftNav extends Component {
    /*
    *  使用menu 的数据数组生成对应的标签数组
    *       使用map() + 递归调用
    * */
    getMenuNodes_map = (menuList) => {
        return menuList.map(item => {
            /*
                {
                  title: '首页', // 菜单标题名称
                  key: '/home', // 对应的path
                  icon: 'home', // 图标名称
                  children: [], // 可能有, 也可能没有
                }

                // 根据有无children

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
                      <Icon type="mail"/>
                      <span>商品</span>
                    </span>
                  }
                >
                  <Menu.Item/>
                  <Menu.Item/>
                </SubMenu>

            */
            if(!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                return (
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                      <Icon type={item.icon}/>
                      <span>{item.title}</span>
                    </span>
                        }
                    >
                        {this.getMenuNodes_map(item.children)}
                    </SubMenu>
                )
            }

        })
    }

    /*
      根据menu的数据数组生成对应的标签数组
      使用reduce() + 递归调用
        相当于向一个空数组中添加数组
     */
    getMenuNodes_reduce = (menuList) => {
        return menuList.reduce((pre, item) => {
            // 向pre添加<Menu.Item>
            if(!item.children) {
                pre.push((
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                ))
            } else {
                // 向pre添加<SubMenu>
                pre.push((
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                      <Icon type={item.icon}/>
                      <span>{item.title}</span>
                    </span>
                        }
                    >
                        {this.getMenuNodes_reduce(item.children)}
                    </SubMenu>
                ))
            }

            return pre
        }, [])
    }

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
                    {
                        // this.getMenuNodes_map(menuList)
                        this.getMenuNodes_reduce(menuList)
                    }

                    {/*<Menu.Item key="/home">*/}
                        {/*<Link to='/home'>*/}
                            {/*<Icon type="home" />*/}
                            {/*<span>首页</span>*/}
                        {/*</Link>*/}
                    {/*</Menu.Item>*/}
                    {/*<SubMenu*/}
                        {/*key="sub1"*/}
                        {/*title={*/}
                            {/*<span>*/}
                                {/*<Icon type="appstore" />*/}
                                {/*<span>商品</span>*/}
                            {/*</span>*/}
                        {/*}*/}
                    {/*>*/}
                        {/*<Menu.Item key="/category">*/}
                            {/*<span>*/}
                                {/*<Link to='/category'>*/}
                                    {/*<Icon type="bars" />*/}
                                    {/*<span>品类管理</span>*/}
                                {/*</Link>*/}

                            {/*</span>*/}
                        {/*</Menu.Item>*/}
                        {/*<Menu.Item key="/product">*/}
                            {/*<span>*/}
                                {/*<Link to='/product'>*/}
                                   {/*<Icon type="tool" />*/}
                                    {/*<span>商品管理</span>*/}
                                {/*</Link>*/}
                            {/*</span>*/}
                        {/*</Menu.Item>*/}
                    {/*</SubMenu>*/}
                    {/*<Menu.Item key="/user">*/}
                        {/*<Link to='/user'>*/}
                            {/*<Icon type="user" />*/}
                            {/*<span>用户管理</span>*/}
                        {/*</Link>*/}
                    {/*</Menu.Item>*/}
                    {/*<Menu.Item key="/role">*/}
                        {/*<Link to='/role'>*/}
                            {/*<Icon type="safety" />*/}
                            {/*<span>角色管理</span>*/}
                        {/*</Link>*/}
                    {/*</Menu.Item>*/}
                    {/*<SubMenu*/}
                        {/*key="sub12"*/}
                        {/*title={*/}
                            {/*<span>*/}
                                {/*<Icon type="area-chart" />*/}
                                {/*<span>图形图表</span>*/}
                            {/*</span>*/}
                        {/*}*/}
                    {/*>*/}
                        {/*<Menu.Item key="/charts/bar">*/}
                            {/*<span>*/}
                                {/*<Link to='/charts/bar'>*/}
                                    {/*<Icon type="bar-chart" />*/}
                                    {/*<span>柱形图</span>*/}
                                {/*</Link>*/}
                            {/*</span>*/}
                        {/*</Menu.Item>*/}
                        {/*<Menu.Item key="/charts/line">*/}
                            {/*<span>*/}
                                {/*<Link to='/charts/line'>*/}
                                   {/*<Icon type="line-chart" />*/}
                                    {/*<span>折线图</span>*/}
                                {/*</Link>*/}
                            {/*</span>*/}
                        {/*</Menu.Item>*/}
                        {/*<Menu.Item key="/charts/pie">*/}
                            {/*<span>*/}
                                {/*<Link to='/charts/pie'>*/}
                                   {/*<Icon type="pie-chart" />*/}
                                    {/*<span>饼图</span>*/}
                                {/*</Link>*/}
                            {/*</span>*/}
                        {/*</Menu.Item>*/}
                    {/*</SubMenu>*/}
                </Menu>
            </div>
         )
    }
}
 
export default LeftNav