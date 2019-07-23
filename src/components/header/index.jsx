import React, { Component } from 'react'
import { withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import './index.less'
import { reqWeather } from '../../api'
import { formateDate } from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import LinkButton from '../link-button'
import {Modal} from 'antd'
import menuList from '../../config/menuConfig'


class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sysTime: formateDate(Date.now()),
            dayPictureUrl: '', // 天气图片的 url
            weather: ''
        }
    }

    // 发异步 ajax 获取天气数据并更新状态
    getWeather = async() => {
        const {dayPictureUrl, weather} = await reqWeather('北京')
        this.setState({
            dayPictureUrl,
            weather
        })
    }

    // 启动循环定时器, 每隔 1s 更新一次 sysTime
    getSysTime = () => {
        this.intervalId = setInterval(() => {
            this.setState({
                sysTime: formateDate(Date.now())
            })
        }, 1000)
    }

    // 根据请求的 path 得到对应的标题
    // 判断父元素是否匹配  如果有children  在查找子元素是否匹配
    getTitle = (path) => {
        // 得到当前请求路径
        // console.log(path)

        let title
        menuList.forEach(menu => {
            // 如果当前item对象的key与path一样,item的title就是需要显示的title
            if(menu.key === path) {
                title = menu.title
            } else if(menu.children) {
                // 在所有子item中查找匹配的
                const cItem = menu.children.find(cItem => path.indexOf(cItem.key) === 0)
                // 如果有值才说明匹配
                if(cItem) {
                   title = cItem.title
                }
                // menu.children.forEach(item => {
                //     if(path.indexOf(item.key) === 0) {
                //         title = item.title
                //     }
                // })
            }
        })

        return title
    }


    componentDidMount() {
        this.getSysTime()
        this.getWeather()
    }

    componentWillUnmount() {
        // 清除定时器
        clearInterval(this.intervalId)
    }

    // 性能优化（问题存在  时间更新模块都会渲染）
    // shouldComponentUpdate(nextProps, nextState) {
    //     return true
    // }

    render() {
        // 数据解构赋值
        const {sysTime, dayPictureUrl, weather} = this.state
        // 当前登录的用户
        const user = memoryUtils.user
        // 当前页面的请求路径
        // const path  = this.props.location.pathname
        // console.log(path);
        // const title = this.getTitle(path)
        const title = this.props.headTitle

        return ( 
            <div className='header'>
                <div className="header-top">
                    <span>欢迎, {user.username}</span>
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>{title}</div>
                    <div className='header-bottom-right'>
                        <span>{sysTime}</span>
                        <img src={dayPictureUrl} alt="weather"/>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
         );
    }

    // 退出登录
    logout = () => {
        Modal.confirm({
            content: '确定退出当前系统吗?',
            onOk: () => {
                // 要用箭头函数  存在this 的问题
                console.log('ok')
                // 移除登录信息user 跳转到login
                storageUtils.removeUser()
                memoryUtils.user = {}
                this.props.history.replace('/login')
            },
            onCancel() {
                console.log('cancel')
            }
        });
    }
}
 
export default connect(
   state => ({headTitle: state.headTitle}),
    {}
)(withRouter(Header))