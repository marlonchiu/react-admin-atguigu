// 包含应用中所有的请求接口

// 基本要求: 能根据接口文档定义接口请求函数

import ajax from './ajax'
import jsonp from 'jsonp'
import {message} from 'antd'

// const BASE = 'http://localhost:5000'
const BASE = ''
// 登录
//  如果 使用箭头函数 {} 则需要return
export const reqLogin = (username, password)=> ajax(BASE + '/login', {username, password}, 'POST')

// category 模块的接口
// 获取一级/二级分类的列表
export const reqCategorys = (parentId) => ajax(BASE + '/manage/category/list', {parentId})

// 添加分类
export const reqAddCategory = (categoryName, parentId) => ajax(BASE + '/manage/category/add', {categoryName, parentId}, 'POST')

// 更新分类
export const reqUpdateCategory = ({categoryId, categoryName}) => ajax(BASE + '/manage/category/update', {categoryId, categoryName}, 'POST')

// 获取一个分类
export const reqCategory = (categoryId) => ajax(BASE + '/manage/category/info', {categoryId})

// 获取商品分页列表
export const reqProducts = ({pageNum, pageSize}) => ajax(BASE + '/manage/product/list', {pageNum, pageSize})

// 更新商品的状态(上架/下架)
export const reqUpdateStatus = (productId, status) => ajax(BASE + '/manage/product/updateStatus', {productId, status}, 'POST')

/*
* 搜索商品分页列表 (根据商品名称/商品描述)
* searchType: 搜索的类型, productName/productDesc
* */
export const reqSearchProducts = ({pageNum, pageSize, searchType, searchName}) => ajax(BASE + '/manage/product/search', {
  pageNum,
  pageSize,
  [searchType]: searchName,
})

// // 搜索商品分页列表 (根据商品描述)
// export const reqSearchProducts = ({pageNum, pageSize, searchName}) => ajax(BASE + '/manage/product/search', {
//   pageNum,
//   pageSize,
//   productDesc: searchName
// })


// 添加用户
export const reqAddUser = (user) => ajax(BASE + '/manage/user/add', user, 'POST')

// 百度天气
export const reqWeather = (city) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&ou
tput=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    return new Promise(((resolve, reject) => {
        jsonp(url, {
            params: 'callback'
        }, (error, data) => {
            // console.log(data);
            if(!error && data.status === 'success') {
                const {dayPictureUrl, weather} = data.results[0].weather_data[0]
                resolve({dayPictureUrl, weather})
            } else {
                message.error('获取天气信息失败!')
            }
        })

    }))
}

// reqWeather('北京')
/*
    jsonp解决ajax跨域的原理
      1). jsonp只能解决GET类型的ajax请求跨域问题
      2). jsonp请求不是ajax请求, 而是一般的get请求
      3). 基本原理
       浏览器端:
          动态生成<script>来请求后台接口(src就是接口的url)
          定义好用于接收响应数据的函数(fn), 并将函数名通过请求参数提交给后台(如: callback=fn  callback=__jp0)
       服务器端:
          接收到请求处理产生结果数据后, 返回一个函数调用的js代码, 并将结果数据作为实参传入函数调用
       浏览器端:
          收到响应自动执行函数调用的js代码, 也就执行了提前定义好的回调函数, 并得到了需要的结果数据
 */