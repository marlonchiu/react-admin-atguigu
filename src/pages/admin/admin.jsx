import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'

// 后台管理的路由组件
class Admin extends Component {
    render() {
        const user = memoryUtils.user
        console.log(user);
        if(!user._id) {
            return <Redirect to='/login' />
        }
        return ( 
            <div>
                <h2>后台admin</h2>
                <p>Hello, { user.username }</p>
            </div>
         );
    }
}
 
export default Admin;