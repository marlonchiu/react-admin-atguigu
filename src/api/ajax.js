/*
    能发送异步ajax请求的函数模块
    封装axios库
    函数的返回值是promise对象
    1. 优化1: 统一处理请求异常?
        在外层包一个自己创建的promise对象
        在请求出错时, 不reject(error), 而是显示错误提示
    2. 优化2: 异步得到不是reponse, 而是response.data
       在请求成功resolve时: resolve(response.data)
 */
import axios from 'axios'
import  { message } from 'antd'

const ajax = (url, data={}, method='GET') => {
    return new Promise(function (resolve, reject) {
        let promise
        // 执行异步ajax请求
        if(method === 'GET') {
            promise = axios.get(url, {
                params: data
            })
        } else {
            promise = axios.post(url, data)
        }

        promise.then(response => {
            // 如果成功了, 调用 resolve(response.data)
            resolve(response.data)
            // 3. 如果失败了, 不调用reject(reason), 而是提示异常信息
        }).catch(error => {
            message.error('请求错误：' + error.message)
        })
    })
}

export default ajax
// 请求登陆接口
// ajax('/login', {username: 'Tom', passsword: '12345'}, 'POST').then()
// 添加用户
// ajax('/manage/user/add', {username: 'Tom', passsword: '12345', phone: '13712341234'}, 'POST').then()