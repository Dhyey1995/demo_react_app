import React, { Component } from 'react';
import NavHader from '../components/NavHader.js';
import { NavLink } from 'react-router-dom';
import AddBudgetFrom from '../components/AddBudgetFrom.js';

export default class BudgetAdd extends Component {
    render() {
        return (
            <div className="dashboard-main-wrapper">
                <div className="dashboard-header">
                    <NavHader />
                    <div className="nav-left-sidebar sidebar-dark">
                        <div className="menu-list">
                            <li>
                                <div className="conntection-footer">
                                    <NavLink to={'/'}>Dashboard</NavLink> 
                                </div>
                                {/* <br /> */}
                                <div className="conntection-footer">
                                    <NavLink to={'/add_new_budget'}>Add new budget</NavLink> 
                                </div>
                            </li>
                        </div>
                    </div>
                </div>
                <AddBudgetFrom />
            </div>
        )
    }
}
