import React, { Component, Fragment } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
// import memoryUtils from '../../utils/memoryUtils'
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'

import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import NotFound from '../not-found/not-found'

import { Layout } from 'antd'
const { Footer, Sider, Content } = Layout

// 后台管理的路由组件
class Admin extends Component {
    render() {
        // const user = memoryUtils.user
        const user = this.props.user
        // console.log(user)
        if(!user._id) {
            return <Redirect to='/login' />
        }
        return ( 
            <Fragment>
                <Layout style={{minHeight: '100%'}}>
                    <Sider>
                        <LeftNav></LeftNav>
                    </Sider>
                    <Layout>
                        <Header>
                            <p>Hello, { user.username }</p>
                        </Header>
                        <Content style={{margin: '20px', backgroundColor: '#fff' }}>
                            <Switch>
                                <Redirect exact from='/' to='/home'/>
                                <Route path='/home' component={Home} />
                                <Route path='/category' component={Category}/>
                                <Route path='/product' component={Product}/>
                                <Route path='/role' component={Role}/>
                                <Route path='/user' component={User}/>
                                <Route path='/charts/bar' component={Bar}/>
                                <Route path='/charts/line' component={Line}/>
                                <Route path='/charts/pie' component={Pie}/>
                                <Route component={NotFound}/> {/*上面没有一个匹配, 直接显示*/}
                            </Switch>
                        </Content>
                        <Footer style={{textAlign: 'center', color: '#aaa'}}>推荐使用谷歌浏览器，
                            可以获得更佳页面操作体验</Footer>
                    </Layout>
                </Layout>
            </Fragment>
         );
    }
}
 
export default connect(
    state => ({user: state.user}),
    {}
)(Admin)