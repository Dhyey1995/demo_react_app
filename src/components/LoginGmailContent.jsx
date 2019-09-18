import React, { Component } from 'react';
import LoginGmail from './LoginGmail';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class LoginGmailContent extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataLogin:''
        }
    }
    gmailLoginData = logindata => {
        this.setState({
            dataLogin:logindata
        });
    }
    render() {
        return (
            <div className="dashboard-wrapper">
                <div className="container-fluid  dashboard-content">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="page-header">
                                <LoginGmail  getLogindata={this.gmailLoginData} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            {/* <BootstrapTable data={products} striped hover>
                                <TableHeaderColumn isKey dataField='id'>Product ID</TableHeaderColumn>
                                <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
                                <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
                            </BootstrapTable> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginGmailContent;