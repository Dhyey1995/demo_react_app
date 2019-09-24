import React, { Component } from 'react';
import NavHader from '../components/NavHader.js';
import Sidebar from '../components/Sidebar.js';
import LineItemCategoryContent from '../components/LineItemCategoryContent';

class LineItemCategory extends Component {

    
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
                <LineItemCategoryContent />
            </div>
        );
    }
}

export default LineItemCategory;