import React, { Component } from 'react';
import NavHader from '../components/NavHader.js';
import Sidebar from '../components/Sidebar.js';
import Template from '../components/Template.js';
import Axios from 'axios';
import { Button } from 'react-bootstrap';
import LocalStorage from 'localStorage';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css';

class SelectTemplate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            templates:[],
            api_response:true,
            budgetID:LocalStorage.getItem('budgetID'),
        }
    }
    
    async componentDidMount() {
        Axios.get("https://betasite.online/laravelAPI/api/templates")
            .then(({ data }) => {
               this.setState({
                templates:data.data,
                
            });
        }); 
        LocalStorage.setItem('user_id',25);
    }
    render() {
        if (!this.state.budgetID) {
            return <Redirect to='/add_new_budget' />;
        } 
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
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="page-header">
                                    <h2 className="pageheader-title">Select Template</h2>
                                </div>
                            </div>
                        </div>  
                        <div className="row">
                            {this.state.templates.map( (template , index) => (
                                <div key={index} className="col-md-4">
                                    <Template budgetID={this.state.budgetID} props={template} />
                                </div>
                            ))}
                        </div>
                        <div className="row">
                            <div className="col-sm-3">
                                <NavLink to={'/add_new_template'}>
                                    <Button variant="primary" size="lg">
                                        Add New Template
                                    </Button>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default SelectTemplate;