// redux最核心的管理对象: store
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer'
import thunk from 'redux-thunk' // 用来实现 redux 异步的 redux 中间件插件
const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store   // 创建store对象内部会第一次调用reducer()得到初始状态值