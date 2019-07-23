/*
用来根据老的state和指定的action生成并返回新的state的函数
 */
import {combineReducers} from 'redux'

import storageUtils from '../utils/storageUtils'

import {
    SET_HEAD_TITLE,
    RECEIVE_USER,
    RESET_USER,
    SHOW_ERROR_MSG
} from './action-types'
/*
用来管理头部标题的reducer函数
 */
const initHeadTitle = '首页'

function headTitle(state = initHeadTitle, action) {
    switch (action.type) {
        case SET_HEAD_TITLE:
            return action.data
        default:
            return state
    }
}

/*
用来管理当前登陆用户的reducer函数
 */
const initUser = storageUtils.getUser()

function user(state = initUser, action) {
    switch (action.type) {
        case RECEIVE_USER:
            return action.data
        case SHOW_ERROR_MSG:
            const errorMsg = action.errorMsg
            // state.errorMsg = errorMsg  // 不要直接修改原本状态数据
            return {...state, errorMsg} // 在原有数据的基础上扩展数据
        case RESET_USER:
            return {}
        default:
            return state
    }
}

/*
向外默认暴露的是合并产生的总的reducer函数
管理的总的state的结构:
  {
    headTitle: '首页',
    user: {}
  }
 */
export default combineReducers({
    headTitle,
    user
})