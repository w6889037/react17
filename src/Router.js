import React from "react";
import { ReactDOM } from "react-dom";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

class TestRouter extends React.Component {

    render = () => {
        return <div>
            <Router>
                <Link to="/first">页面一</Link><span> </span>
                <Link to="/second">页面二</Link><br /><br />
                <Routes>
                    <Route path="/" exact element={<Home />}></Route> {/* 刚进来的默认页面 exact表示精确匹配 */}
                    <Route path="/first" element={<First />}></Route>
                    <Route path="/second" element={<Second />}></Route>
                </Routes>
            </Router>
        </div>

    }
}

const Home = () => {
    return '这是HOME页面'
}

const First = () => {
    return '页面一内容'
}

const Second = () => {
    return '页面二内容'
}

export default TestRouter