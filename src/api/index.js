// 包含应用中所有的请求接口

import ajax from './ajax'

// const BASE_URL = 'http://localhost:5000'
const BASE_URL = ''
// 登录
//  如果 使用箭头函数 {} 则需要return
export const reqLogin = (username, password)=> ajax(BASE_URL + '/login', {username, password}, 'POST')

// 添加用户
export const reqAddUser = (user) => ajax(BASE_URL + '/manage/user/add', user, 'POST')