import React, { Component } from 'react'
// 引入路由
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './pages/login/login'
import Admin from './pages/admin/admin'
class App extends Component {
    render() { 
        return ( 
            <BrowserRouter>
                <Switch>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/' component={Admin}></Route>
                </Switch>
            </BrowserRouter>
         )
    }
}
 
export default App
