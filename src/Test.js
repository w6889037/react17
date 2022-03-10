import React from "react";

class Test extends React.Component {
    render() {
        return <div>
            <p>这是一个导入的组件</p>
            <button onClick={this.click}>类绑定事件</button><br />
            <a href="www.baidu.com" onClick={this.handleClick}>阻止浏览器跳转</a><br />
            count: {this.state.count} <button onClick={this.add}>+1</button>
            <button onClick={this.sub}>-1</button><br />
            <input name='msg' type='text' value={this.state.msg} onChange={this.change}></input>{this.state.msg}<br />
            <input name='isChecked' type='checkbox' checked={this.state.isChecked} onChange={this.change}></input> {this.state.isChecked} <br />
            <input name="username" type='text' value={this.state.username} onChange={this.change} placeholder='请输入评论人' /> <br />
            <textarea name='content' cols='30' rows='10' value={this.state.content} onChange={this.change} placeholder="请输入评论内容"></textarea> <br />
            <button onClick={this.submit}>提交</button>
            <ul>
                {this.state.comments.map(item => <li key={item.id}>评论人: {item.username}<br />评论内容：{item.content}</li>)}
            </ul>
        </div>
    }

    click() {
        alert('类绑定事件')
    }

    handleClick(e) {
        e.preventDefault();
        console.log('浏览器没有跳转')
    }

    state = {
        count: 0,
        msg: '',
        isChecked: false,
        username: '',
        content: '',
        comments: []
    }

    add = () => {
        this.setState({
            count: this.state.count + 1
        })
    }

    sub = () => {
        this.setState({
            count: this.state.count - 1
        })
    }

    change = (e) => {

        const target = e.target

        const type = target.type
        const name = target.name
        const value = type === 'checkbox' ? target.checked : target.value

        this.setState({
            [name]: value
        })
    }

    submit = (e) => {
        const { username, content } = this.state

        if (username === '' || content === '') {
            alert('请输入评论内容')
            return
        }

        const newComments = [{
            id: Math.random(),
            username: username,
            content: content
        }, ...this.state.comments]

        this.setState({
            comments: newComments,
            username: '', // 清空文本框
            content: ''// 清空内容
        })
    }
}

export default Test