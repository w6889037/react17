import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Test from './Test'
import PropTypes from 'prop-types'
import LifeCycle from './LiftCycle'
import Mouse from './Mouse'
import img from './img/cat1.jpg'

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

//高阶组件
function withExt(WrapperComponent) {
  class High extends React.Component {
    state = {
      username: '高阶组件'
    }

    render() {
      return <WrapperComponent {...this.state} {...this.props}></WrapperComponent>
    }
  }

  //设置displayName
  Mouse.displayName = `withExt${getDisplayName(WrapperComponent)}`
  return High
}

const HighComponent = props => {
  return <div>{props.username}: {props.age}</div>
}

const HighExt = withExt(HighComponent);

function getDisplayName(WrapperComponent) {
  return WrapperComponent.displayName || WrapperComponent.name || 'Component'
}

//鼠标移动
const mouseMove = mouse => {
  return <p>鼠标位置: {mouse.x} {mouse.y}</p>
}

const imageMouse = mouse => {
  return <img src={img} alt='图片' style={{ position: 'absolute', top: mouse.y, left: mouse.x }}></img>
}

function ClickButton() {
  return <button onClick={Click}>函数绑定事件</button>

  function Click() {
    alert('函数绑定事件')
  }
}

class HelloClass extends React.Component {
  render() {
    return <p>这是一个类组件</p>
  }
}

function Hello() {
  return <p>这是一个函数组件</p>
}

const { Provider, Consumer } = React.createContext()

//props校验
const PropsValid = props => {
  return <div>
    <div>props校验:</div>
    <div>props默认值: {props.pageSize}</div>
  </div>
}

PropsValid.defaultProps = {
  pageSize: 10
}

PropsValid.propTypes = {
  myNumber: PropTypes.number,
  myFn: PropTypes.func.isRequired,
  myTag: PropTypes.element,
  myFilter: PropTypes.shape({
    area: PropTypes.string,
    price: PropTypes.number
  })
}

//context传参
class Context extends React.Component {

  state = {
    msg: 'context传值可以跨越多个组件'
  }

  render() {
    return <Provider value={this.state.msg}>
      <div>
        <ContextChild>props.children自动取子节点的值</ContextChild>
      </div>
    </Provider>
  }

}

const ContextChild = props => {
  return <div>{props.children}<br />
    <Consumer>{data => <span>{data}</span>}</Consumer>
  </div>
}

//父组件
class Parent extends React.Component {

  state = {
    username: 'aaa',
    msg: ''
  }

  getMsg = data => {
    alert('子组件传来的参数:' + data)
  }

  render() {
    return <Child username={this.state.username} getChildMsg={this.getMsg}></Child>
  }
}

//子组件
const Child = props => {

  const msg = 'bbb'

  const handleClick = () => {
    props.getChildMsg(msg)
  }

  return <div>父组件给子组件传值：{props.username}<button onClick={handleClick}>子组件给父组件传值</button></div>
}

//子组件之间传参
class Counter extends React.Component {
  state = {
    count: 0
  }

  add = () => {
    this.setState({
      count: this.state.count + 1
    })
  }
 
  //防止组件重新渲染
  shouldComponentUpdate() {
    return false
  }

  render() {
    return <div>
      <Child1 count={this.state.count}></Child1>
      <Child2 increment=
        {this.add}></Child2>
    </div>
  }
}

const Child1 = props => {
  return <div>count: {props.count}</div>
}

const Child2 = props => {
  const handleClick = () => {
    props.increment()
  }
  return <div><button onClick={handleClick}>+1</button></div>
}

class PropsClass extends React.Component {
  render() {
    const { name, age, tag } = this.props
    this.props.fn()
    return <p>{name + ':' + age} {tag}</p>
  }
}

const Props = props => {
  console.log(props)
  const { name, age, tag } = props
  props.fn()
  return <p>{name + ':' + age} {tag}</p>
}

const list = [
  { 'id': 1, 'name': 'aaa', 'age': 11 },
  { 'id': 2, 'name': 'bbb', 'age': 12 },
  { 'id': 3, 'name': 'ccc', 'age': 13 }
]
const isLoading = true;
const loadData = () => {
  if (isLoading) {
    return <span>加载中</span>
  }
  return <span>未加载</span>
}
const span = <span>我是一个span</span>
const sayHi = () => "say hi"
const name = "hahaha"
const title =
  <div className='div'>
    <p className='name'>{name}</p>
    <p>{1 + 7}</p>
    <p>{3 > 5 ? '大于' : '小于'}</p>
    <p>{sayHi()}</p>
    <p>{span}</p>
    <p>{loadData()}</p>
    <ul>{list.map(item => <li key={item.id}>姓名:{item.name},年龄:{item.age}</li>)}</ul>
    <Hello></Hello>
    <HelloClass />
    <Test></Test>
    <ClickButton></ClickButton>
    <Props name='函数组件传参' age={19} fn={() => console.log('这是一个函数')} tag={<span>这是一个jsx表达式</span>}></Props>
    <PropsClass name='类组件传参' age={20} fn={() => console.log('这是一个类')} tag={<span>这是一个jsx表达式</span>}></PropsClass>
    <Parent></Parent>
    <Counter></Counter>
    <Context></Context>
    <PropsValid myFn={() => { }}></PropsValid>
    <LifeCycle></LifeCycle>
    <Mouse renderMouse={mouseMove}></Mouse>
    {/* <Mouse renderMouse={imageMouse}></Mouse> */}
    <HighExt age='11'></HighExt>
  </div>

ReactDOM.render(
  title,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
