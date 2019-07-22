/*
包含n个用来创建action的工厂函数(action creator)
 */
import {INCREMENT, DECREMENT} from './action-types'
// 增加的同步action  返回值对象
export const increment = number => ({type: INCREMENT, data: number})

// 减少的action
export const decrement = number => ({type: DECREMENT, data: number})

// 增肌的 异步 action  返回值函数
export const asyncIncrement = number => {
  return dispatch => {
    // 1. 执行异步（定时器，ajax请求， promise）
    setTimeout(() => {
      // 2. 当异步任务执行完毕，分发一个同步的action
      dispatch(increment(number))
    }, 2000)
  }
}