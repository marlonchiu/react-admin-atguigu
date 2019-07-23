import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import store from './redux/store'
import App from './App'
import storageUtils from './utils/storageUtils'
import memoryUtils from './utils/memoryUtils'

// 如果 local 中保存了 user, 将 user 保存到内存中
const user = storageUtils.getUser()
if(user && user._id) {
    memoryUtils.user = user
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'))
