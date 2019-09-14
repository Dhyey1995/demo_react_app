import React, { Component } from 'react';
import NavHader from '../components/NavHader.js';
import Sidebar from '../components/Sidebar.js';
import { Button , Form } from 'react-bootstrap';

class AddNewTemplate extends Component {
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
                <div className="dashboard-wrapper">
                    <div className="container-fluid  dashboard-content">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="page-header">
                                    <h2 className="pageheader-title">Add New Template</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" />
                                    <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>

                                
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddNewTemplate;