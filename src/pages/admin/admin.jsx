import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
import { Layout } from 'antd'
const { Footer, Sider, Content } = Layout

// 后台管理的路由组件
class Admin extends Component {
    render() {
        const user = memoryUtils.user
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
                        <Content style={{backgroundColor: '#fff'}}>Content</Content>
                        <Footer style={{textAlign: 'center', color: '#aaa'}}>推荐使用谷歌浏览器，
                            可以获得更佳页面操作体验</Footer>
                    </Layout>
                </Layout>
            </Fragment>
         );
    }
}
 
export default Admin;