import React from "react";
import { ReactDOM } from "react-dom";

class Mouse extends React.Component {

    state = {
        x: 0,
        y: 0
    }

    move = (e) => {
        this.setState({
            x: e.clientX,
            y: e.clientY
        })
    }

    componentDidMount = () => {
        window.addEventListener('mousemove', this.move)
    }

    render = () => {
        return this.props.renderMouse(this.state)
    }

    componentWillUnmount = () => {
        window.removeEventListener('mousemove', this.move)
    }
}

export default Mouse