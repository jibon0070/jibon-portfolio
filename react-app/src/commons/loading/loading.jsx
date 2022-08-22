import React from "react";
import './loading.scss';

export default class Loading extends React.Component {
    render() {
        return (
            <div id="loading" className="loading">
                <img src="assets/preloader3.gif" alt="preloader" />
                {this.props.percent ?<progress max="100" value={this.props.percent} ></progress> : null}
                {this.props.percent ? <h5>{this.props.percent}%</h5> : null}
            </div>

        )
    }
}