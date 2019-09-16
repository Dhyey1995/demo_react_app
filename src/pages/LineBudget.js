import React, { Component } from 'react';
import NavHader from '../components/NavHader.js';
import Sidebar from '../components/Sidebar.js';
import LocalStorage from 'localStorage';
import Axios from 'axios';
import { stat } from 'fs';

class LineBudget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            budgetData:'',
            budgetID:LocalStorage.getItem('budgetID')
        }
    }

    componentDidMount = () => {
        let budgetID = this.state.budgetID;
        Axios.get('https://betasite.online/laravelAPI/api/budget/'+budgetID)
        .then( response => {
            this.setState({
                budgetData:response.data.data
            });
        });
    }


    render() {
        console.log(this.state);
        
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
                <div className="dashboard-wrapper">
                    <div className="container-fluid  dashboard-content">
                        {/* <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="page-header">
                                    <h2 className="pageheader-title">Add new line budget</h2>
                                </div>
                            </div>
                        </div> */}
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header p-4">
                                        <h3 className="mb-0">{this.state.budgetData.project_name}</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="row mb-4">
                                            <div className="col-sm-3">
                                                <img src={this.state.budgetData.logo_image} style={{height: '100%', width: '100%'}} />
                                            </div>
                                            <div className="col-sm-3">
                                                <p className="mb-3">Country : <br /><span className="text-danger">{this.state.budgetData.country_name}</span></p>
                                                <p className="mb-3">Producers : <br /><span className="text-danger">{this.state.budgetData.producers}</span></p>
                                                <p className="mb-3">Director : <br /><span className="text-danger">{this.state.budgetData.director}</span></p>
                                            </div>
                                            <div className="col-sm-3">
                                                <p className="mb-3">Brand Mananger: <br /><span className="text-danger">{this.state.budgetData.brand_manager}</span></p>
                                                <p className="mb-3">Email Address: <br /><span className="text-danger">{this.state.budgetData.email}</span></p>
                                            </div>
                                            <div className="col-sm-3">
                                                <p className="mb-3">DOP: <br /><span className="text-danger">{this.state.budgetData.DOP}</span></p>
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <div className="card-footer bg-white">
                                        <p className="mb-0">2983 Glenview Drive Corpus Christi, TX 78476</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LineBudget;