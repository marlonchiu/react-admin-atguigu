import React, { Component } from 'react'
import './index.less'
import {reqWeather} from '../../api'
import { formateDate } from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import {Modal} from 'antd'

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


    componentDidMount() {
        this.getSysTime()
        this.getWeather()
    }

    componentWillUnmount() {
        // 清除定时器
        clearInterval(this.intervalId)
    }


    render() {
        // 数据解构赋值
        const {sysTime, dayPictureUrl, weather} = this.state
        // 当前登录的用户
        const user = memoryUtils.user

        return ( 
            <div className='header'>
                <div className="header-top">
                    <span>欢迎, {user.username}</span>
                    <a onClick={this.logout}>退出</a>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>首页</div>
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
 
export default Header;