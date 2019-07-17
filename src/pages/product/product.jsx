import React, { Component } from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import ProductHome from './product-home'
import ProductAddUpdate from './product-add-update'
import ProductDetail from './product-detail'

class Product extends Component {
    state = {  }
    render() { 
        return ( 
            <Switch>
                {/* exact 如果为 true，则只有在路径完全匹配 location.pathname 时才匹配*/}
                <Route path='/product' exact component={ProductHome} />
                <Route path='/product/addupdate' component={ProductAddUpdate} />
                <Route path='/product/detail' component={ProductDetail} />
                <Redirect to='/product'/>
            </Switch>
         );
    }
}
 
export default Product;