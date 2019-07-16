// 通用的看起来像链接的 button 组件

import React from 'react'
import './index.less'
// 接收的props 包含children function
const LinkButton = (props) => {
    return <button {...props} className='link-button'></button>
}

export default LinkButton