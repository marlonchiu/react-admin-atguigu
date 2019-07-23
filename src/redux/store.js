// redux最核心的管理对象store
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import reducer from './reducer'

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
// 向外默认暴露store
export default store