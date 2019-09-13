import React, { Component } from 'react';
import LocalStorage from 'localStorage';

class Template extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plan:[],
        }
    }
    componentDidMount() {
        this.setState({
            plan:this.props.props,
            user_id:LocalStorage.getItem('user_id'),
        });
    }
    render() {
        return (
            <div className="card">
                {console.log(this.state)}
                <div className="card-header bg-primary text-center p-3 ">
                    <h4 className="mb-0 text-white">{this.state.plan.name}</h4>
                </div>
                <div className="card-body text-center" style={{background: this.state.plan.color}}>
                    <h1 className="mb-1" style={{color: "black"}}>{this.state.plan.budget_count} Budget</h1>
                </div>
                <div className="card-body border-top">
                    <ul className="list-unstyled bullet-check font-14">
                        <li>{this.state.plan.content}</li>
                    </ul>
                    <button value="1" className="btn btn-outline-secondary btn-block btn-lg">Get started</button>
                </div>
            </div>
        );
    }
}

export default Template;