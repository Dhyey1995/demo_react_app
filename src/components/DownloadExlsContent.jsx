import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { CSVLink, CSVDownload } from "react-csv";
import Axios from 'axios';


const headers = [
    { label: "ID", key: "id" },
    { label: "Migration", key: "migration" },
    { label: "Batch", key: "batch" }
];


class DownloadExlsContent extends Component {
    constructor(props){
        super(props);
        this.state = {
            tableHeader:'',
            tableData:'',
            tableName:''
        }
    }

    componentDidMount = () => {
        Axios.get('https://betasite.online/laravelAPI/gettable')
        .then(response => {
            this.setState({
                tableHeader:response.data.tableHeader,
                tableData:response.data.tableData,
                tableName:response.data.tableName
            });
        }); 
    }

    render() {
        return (
            <div className="dashboard-wrapper">
                <div className="container-fluid  dashboard-content">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="page-header">
                                <CSVLink className="btn btn-primary add-group-btn" data={this.state.tableData} headers={headers}>
                                    Download me
                                </CSVLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DownloadExlsContent;