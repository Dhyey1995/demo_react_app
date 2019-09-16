import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import jsPDF from 'jspdf';
import Axios from 'axios';
import autoTable from 'jspdf-autotable';

import 'bootstrap/dist/css/bootstrap.min.css';
class DownloadPdfContent extends Component {
    constructor(props) {
        super(props);
    }

    downloadPdfDynamicTable = () => {

    }


    componentDidMount = () => {
        
    }


    downloadPdfMethod = () => {
        var head = [["ID", "Country", "Rank", "Capital"]];
        var body = [
            [1, "Denmark", 7.526, "Copenhagen"],
            [2, "Switzerland", 7.509, "Bern"],
            [3, "Iceland", 7.501, "Reykjavík"],
            [4, "Norway", 7.498, "Oslo"],
            [5, "Finland", 7.413, "Helsinki"]
        ];
        var doc = new jsPDF();
        doc.text("From javascript arrays",14,10);
        doc.autoTable({ head: head, body: body });
        doc.save("table.pdf");
    }


    render() {
        return (
            <div className="dashboard-wrapper">
                <div className="container-fluid  dashboard-content">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="page-header">
                                <Button onClick={this.downloadPdfMethod} variant="primary" size="lg">
                                    Dwonload simple pdf (static)
                                </Button>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="page-header">
                                <Button onClick={this.downloadPdfDynamicTable} variant="primary" size="lg">
                                    Dwonload dynamic table
                                </Button>
                            </div>
                        </div>
                        {/* <div className="col-md-4">
                            <div className="page-header">
                                <Button onClick={this.Donwloa} variant="primary" size="lg">
                                    Dwonload simple pdf (static)
                                </Button>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        );
    }
}

export default DownloadPdfContent;