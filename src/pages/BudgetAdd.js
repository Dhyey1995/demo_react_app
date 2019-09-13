import React, { Component } from 'react';
import NavHader from '../components/NavHader.js';
import { NavLink } from 'react-router-dom';
import Sidebar from '../components/Sidebar.js';
import AddBudgetFrom from '../components/AddBudgetFrom.js';

export default class BudgetAdd extends Component {
    render() {
        return (
            <div className="dashboard-main-wrapper">
                <div className="dashboard-header">
                    <NavHader />
                    <div className="nav-left-sidebar sidebar-dark">
                        <div className="menu-list">
                            <Sidebar />
                        </div>
                    </div>
                </div>
                <AddBudgetFrom />
            </div>
        )
    }
}
