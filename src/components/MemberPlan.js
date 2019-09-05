import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class MemberPlan extends Component {

    constructor(props){
        super(props);
        console.log(this.props);
        
    }

    render() {
        return (
            <div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                    <div className="card">
                    <div className="card-header bg-primary text-center p-3 ">
                        <h4 className="mb-0 text-white"> Basic</h4>
                    </div>
                    <div className="card-body text-center">
                        <h1 className="mb-1">$150</h1>
                        <p>Per Month Plateform</p>
                    </div>
                    <div className="card-body border-top">
                        <ul className="list-unstyled bullet-check font-14">
                        <li>Facebook, Instagram, Pinterest,Snapchat.</li>
                        <li>Guaranteed follower growth for increas brand awareness.</li>
                        <li>Daily updates on choose platforms</li>
                        <li>Stronger customer service through daily interaction</li>
                        <li>Monthly progress report</li>
                        <li>1 Million Followers</li>
                        </ul>
                        <a href="#" className="btn btn-outline-secondary btn-block btn-lg">Get Started</a>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}
