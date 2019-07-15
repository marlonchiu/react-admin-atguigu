// 包含应用中所有的请求接口

import ajax from './ajax'


// 登录
//  如果 使用箭头函数 {} 则需要return
export const reqLogin = (username, password)=> ajax('/login', {username, password}, 'POST')

// 添加用户
export const reqAddUser = (user) => ajax('/manage/user/add', user, 'POST')