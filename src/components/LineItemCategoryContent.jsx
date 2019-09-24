import React, { Component } from 'react';
import Axios from 'axios';
import LocalStorage from 'localStorage';
import ContentEditable from 'react-contenteditable'

class LineItemCategoryContent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            costId: LocalStorage.getItem('costs_id'),
            lineItem: [],
        }
    }

    componentDidMount = () => {
        Axios.get('https://betasite.online/laravelAPI/api/getLineItemsCategory/' + this.state.costId)
            .then(response => {
                if(response.data.status){
                    this.setState({
                        lineItem: response.data.data
                    });
                }
            })
            .catch(error => {
                console.log(error);
            })
            .finally(function () {

            });
    }

    render() {
        return (
            <div className="dashboard-wrapper">
                <div className="container-fluid  dashboard-content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <h5 className="card-header">Header</h5>
                                <div className="card-body">

                                    

                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Item name</th>
                                                <th scope="col">No</th>
                                                <th scope="col">Days</th>
                                                <th scope="col">Rate</th>
                                                <th scope="col">Travel Days</th>
                                                <th scope="col">Travel Rate</th>
                                                <th scope="col">Travel Pay</th>
                                                <th scope="col">OT HRS</th>
                                                <th scope="col">OT</th>
                                                <th scope="col">ESTIMATE</th>
                                                <th scope="col">ACTUAL</th>
                                                <th scope="col">Edit / Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.lineItem.map((onelineItem, index) => {
                                                return (
                                                    <React.Fragment>
                                                        <tr>
                                                            <td className="text-center" colSpan="13">{onelineItem.name}</td>
                                                        </tr>
                                                        {onelineItem.line_item.map((singleLineItem, index) => {
                                                            return (
                                                                <tr>
                                                                    <td> {singleLineItem.id} </td>
                                                                    <td> {singleLineItem.name} </td>
                                                                    <td> </td>
                                                                    <td> </td>
                                                                    <td> </td>
                                                                    <td> </td>
                                                                    <td> </td>
                                                                    <td> </td>
                                                                    <td> </td>
                                                                    <td> </td>
                                                                    <td> </td>
                                                                    <td> </td>
                                                                    <td> </td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </React.Fragment>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LineItemCategoryContent;