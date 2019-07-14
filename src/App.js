import React, { Component } from 'react'
import {Button, message} from 'antd'

class App extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <Button type='primary'
                    onClick={this.handleClick}>学习</Button>
            </div>
         )
    }

    // 注意要绑定this  否则的话可以使用箭头函数
    handleClick = () => {
        message.success('成功啦...')
    }
}
 
export default App
