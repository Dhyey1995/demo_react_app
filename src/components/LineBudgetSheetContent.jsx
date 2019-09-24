import React, { Component } from 'react';
import Axios from 'axios';
import { NavLink , Link} from 'react-router-dom';
import LocalStorage from 'localStorage';
import { Redirect } from 'react-router';

class LineBudgetSheetContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sheetData: [],
            budgetID: LocalStorage.getItem('budgetID'),
            budgetData: '',
            costs_id:''
        }
    }

    myMethod = ( event ) => {
        this.setState({
            costs_id:event.target.id
        });
        LocalStorage.setItem('costs_id',event.target.id);
    }

    componentDidMount = () => {
        Axios.get('https://betasite.online/laravelAPI/api/front_sheet_master')
            .then(response => {
                this.setState({
                    sheetData: response.data.data
                });
            });

        let budgetID = this.state.budgetID;
        Axios.get('https://betasite.online/laravelAPI/api/budget/' + budgetID)
            .then(response => {
                this.setState({
                    budgetData: response.data.data
                });
            });
    }

    render() {
        if( this.state.costs_id ){
            return <Redirect to='/line_item_category' />;
        }
        return (
            <div className="dashboard-wrapper">
                <div className="container-fluid  dashboard-content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <h5 className="card-header">{this.state.budgetData.full_name}</h5>
                                <div className="card-body">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Cost Summary</th>
                                                <th scope="col">BID Totals	</th>
                                                <th scope="col">Actual</th>
                                                <th scope="col">Difference</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.sheetData.map((oneSheetData, index) => (
                                                <tr key={index}>
                                                    <th scope="row">{oneSheetData.cat_code}</th>
                                                    <td>{oneSheetData.front_sheet_name}</td>
                                                    <td>315000</td>
                                                    <td>0</td>
                                                    <td>315000</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body border-top">
                                    {this.state.sheetData.map((oneSheetData, index) => (
                                        <button key={index} onClick={this.myMethod} id={oneSheetData.id} className="btn btn-rounded btn-danger ml-3">{oneSheetData.cat_code}</button>                                        
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default LineBudgetSheetContent;