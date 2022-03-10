import React from "react";

class LifeCycle extends React.Component {

    constructor() {
        super()
        console.warn('生命周期钩子函数contructor,主要用于初始化state,为事件处理程序绑定this')
    }

    render() {
        console.warn('生命周期钩子函数render,在这个方法不可以调用setState方法')
        return <div>生命周期钩子函数</div>
    }

    componentDidUpdate(prevProps) {
        console.warn('生命周期钩子函数componentDidUpdate,一般用于发送网络请求,DOM操作,在render后执行,调setState需要加if判断')
        console.log('上一次的props:', prevProps, '当前的props:', this.props)
        // if (prevProps.count !== this.props.count) {
        //     this.setState
        //     发送ajax请求
        //     dom操作
        // }
    }

    componentDidMount() {
        console.warn('生命周期钩子函数componentDidMount,一般用于发送网络请求,DOM操作')
    }

    componentWillUnmount() {
        console.warn('生命周期钩子函数componentWillUnmount,组件消失时触发,一般用于清理工作,比如清除定时器')
    }
}

export default LifeCycle