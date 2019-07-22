// redux最核心的管理对象: store
import { createStore } from 'redux'
import reducer from './reducer'
const store = createStore(reducer)

export default store   // 创建store对象内部会第一次调用reducer()得到初始状态值