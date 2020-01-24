import React, { Component } from 'react';
import Axios from 'axios';
import { Button } from 'react-bootstrap';
import LocalStorage from 'localStorage';
import ContentEditable from 'react-contenteditable';
import HtmlDecode from 'decode-html';
import FormData from 'form-data';
import JSPDF from 'jspdf';

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
                if (response.data.status) {
                    let dataItem = [];
                    response.data.data.forEach(category => {
                        dataItem.push({ categoryName: category.name, mainCategoryID: category.id });
                        category.line_item.forEach(subcategory => {
                            let lineItemHeader = {
                                name: '', no: '', days: '', rate: '', travelDays: '', travelRates: '', travelPays: '',
                                otHours: '', ot: '', estimate: '', actual: '', indexnumber: '', mainCategoryID: category.id
                            };
                            if (subcategory.name) {
                                lineItemHeader.name = subcategory.name;
                            } else {
                                lineItemHeader.name = '';
                            }
                            if (subcategory.id) lineItemHeader.indexnumber = subcategory.id;
                            dataItem.push(lineItemHeader);
                        });
                    });
                    this.setState({
                        lineItem: dataItem
                    });
                }
            });
    }
    handleContentEditableUpdate = (event) => {
        if (event.currentTarget.attributes.maincategoryid) {
            let indexNumber = event.currentTarget.attributes.indexnumber.value;
            let changedValue = HtmlDecode(event.target.value);
            let dataItem = [];
            this.state.lineItem.forEach((oneRowItem, index) => {
                if (index === parseFloat(indexNumber)) {
                    oneRowItem.categoryName = changedValue; dataItem.push(oneRowItem);
                } else {
                    dataItem.push(oneRowItem);
                }
            });
            this.setState({ lineItem: dataItem });
        } else {
            let currentHeaderName = event.currentTarget.attributes.headername.value;
            let currentIndexNumber = event.currentTarget.attributes.indexnumber.value;
            let changedValue = HtmlDecode(event.target.value);
            let dataItem = [];
            this.state.lineItem.forEach((oneRowItem, index) => {
                if (index === parseFloat(currentIndexNumber)) {
                    if (currentHeaderName === 'name') oneRowItem.name = changedValue;
                    if (currentHeaderName === 'no') oneRowItem.no = changedValue;
                    if (currentHeaderName === 'days') oneRowItem.days = changedValue;
                    if (currentHeaderName === 'rate') oneRowItem.rate = changedValue;
                    if (currentHeaderName === 'travelDays') oneRowItem.travelDays = changedValue;
                    if (currentHeaderName === 'travelRates') oneRowItem.travelRates = changedValue;
                    if (currentHeaderName === 'travelPays') oneRowItem.travelPays = changedValue;
                    if (currentHeaderName === 'otHours') oneRowItem.otHours = changedValue;
                    if (currentHeaderName === 'ot') oneRowItem.ot = changedValue;
                    if (currentHeaderName === 'estimate') oneRowItem.estimate = changedValue;
                    if (currentHeaderName === 'actual') oneRowItem.actual = changedValue;
                    if (currentHeaderName === 'indexnumber') oneRowItem.indexnumber = changedValue;
                    dataItem.push(oneRowItem);
                } else {
                    dataItem.push(oneRowItem);
                }
            });
            this.setState({
                lineItem: dataItem
            });
        }
    }
    methodPublish = () => {
        let dataPayload = new FormData();
        dataPayload.append("budget_id", LocalStorage.getItem('budgetID'));
        dataPayload.append("front_sheet_id", LocalStorage.getItem('costs_id'));
        dataPayload.append("user_id", LocalStorage.getItem('user_id'));
        dataPayload.append("dataPayload", JSON.stringify(this.state.lineItem));
        Axios.post('https://betasite.online/laravelAPI/api/user_budget_details', dataPayload)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }
    addLineItemsMethod = (event) => {
        let dataItem = [];
        let indexnumber = event.target.attributes.indexnumber.value;
        let mainCategoryId = event.target.attributes.maincategoryid.value;
        let mainCategoryCount = 0;
        let lineItemHeader = {
            name: '', no: '', days: '', rate: '', travelDays: '', travelRates: '', travelPays: '', isNew: true,
            otHours: '', ot: '', estimate: '', actual: '', indexnumber: '', mainCategoryID: mainCategoryId,
        };
        this.state.lineItem.forEach(oneRowItem => {
            if (parseFloat(mainCategoryId) === parseFloat(oneRowItem.mainCategoryID)) mainCategoryCount++;
        });
        this.state.lineItem.forEach((oneRowItem, index) => {
            if (index === parseFloat(indexnumber) + mainCategoryCount) {
                dataItem.push(lineItemHeader);
                dataItem.push(oneRowItem);
            } else {
                dataItem.push(oneRowItem);
            }
        });
        if (dataItem.length === this.state.lineItem.length) dataItem.push(lineItemHeader);
        this.setState({ lineItem: dataItem });
    }

    removeLineItemsMethod = (event) => {
        let dataItem = []; let indexnumber = event.target.attributes.indexnumber.value;
        this.state.lineItem.forEach((oneRowItem, index) => {
            if (parseFloat(indexnumber) !== index) {
                dataItem.push(oneRowItem);
            }
        });
        this.setState({ lineItem: dataItem });
    }
    deleteCategoryMethod = (event) => {
        let dataItem = []; let maincategoryID = event.target.attributes.maincategoryid.value;
        this.state.lineItem.forEach(oneRowItem => {
            if (parseFloat(oneRowItem.mainCategoryID) !== parseFloat(maincategoryID)) {
                dataItem.push(oneRowItem);
            }
        });
        this.setState({ lineItem: dataItem });
    }
    addNewCategoryMethod = (event) => {
        let categoryLength = 1; let dataItem = [];
        this.state.lineItem.forEach(oneRowItem => {
            if (Object.keys(oneRowItem).length < 4) {
                categoryLength++; dataItem.push(oneRowItem);
            } else {
                dataItem.push(oneRowItem);
            }
        });
        dataItem.push({ categoryName: '', mainCategoryID: categoryLength, isNew: true });
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
        });
        this.setState({ lineItem: dataItem });
    }

    getPdfMethod = () => {

        let dataPayload = this.state.lineItem ; let dataItem = [];

        var head = [["name","no", "days","rate","travelDays","travelRates","travelPays","otHours","ot","estimate","actual"]];

        dataPayload.forEach( oneRowItem => {
            
            if (Object.keys(oneRowItem).length > 4) {
                let dataArray = [
                    oneRowItem.name ,
                    oneRowItem.no ,
                    oneRowItem.days ,
                    oneRowItem.rate , 
                    oneRowItem.travelDays ,
                    oneRowItem.travelRates ,
                    oneRowItem.travelPays ,
                    oneRowItem.otHours ,
                    oneRowItem.ot ,
                    oneRowItem.estimate ,
                    oneRowItem.actual ,
                ];
                console.log(dataArray);
            }
        });
        // var doc = new jsPDF();
        // doc.text("From javascript arrays",14,10);
        // doc.autoTable({ head: head, body: body });
        // doc.save("table.pdf");
        
        
        
    }

    render() {
        const styles = { color: 'red', textAlign: 'center' };
        return (
            <div className="dashboard-wrapper">
                <div className="container-fluid  dashboard-content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <h5 className="card-header">Header
                                    <span className="float-right">
                                        <Button target="_blank" onClick={this.getPdfMethod} variant="success">
                                            Get PDF
                                        </Button>
                                        <Button target="_blank" onClick={this.addNewCategoryMethod} variant="warning">
                                            Add new category
                                        </Button>
                                        <Button target="_blank" onClick={this.methodPublish} variant="primary">
                                            Publish
                                        </Button>
                                    </span>
                                </h5>
                                <div className="card-body">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Pre-Production / Wrap Labor</th>
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
                                                <th scope="col">Add / Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.lineItem.map((oneLineItem, index) => {
                                                if (Object.keys(oneLineItem).length < 4) {
                                                    return (
                                                        <tr key={index}>
                                                            <td colSpan={12} >
                                                                <ContentEditable
                                                                    innerRef={this.contentEditable}
                                                                    html={oneLineItem.categoryName}
                                                                    disabled={false}
                                                                    indexnumber={index}
                                                                    maincategoryid={oneLineItem.mainCategoryID}
                                                                    onChange={this.handleContentEditableUpdate} />
                                                            </td>
                                                            <td>
                                                                <Button
                                                                    indexnumber={index}
                                                                    onClick={this.addLineItemsMethod}
                                                                    maincategoryid={oneLineItem.mainCategoryID}
                                                                    variant="warning">+</Button>
                                                                <Button
                                                                    indexnumber={index}
                                                                    maincategoryid={oneLineItem.mainCategoryID}
                                                                    onClick={this.deleteCategoryMethod}
                                                                    variant="danger">-</Button>
                                                            </td>
                                                        </tr>
                                                    )
                                                } else {
                                                    return (
                                                        <tr key={index}>
                                                            <td> <ContentEditable
                                                                innerRef={this.contentEditable}
                                                                html={index.toString()} // innerHTML of the editable div
                                                                disabled={true}  // use true to disable editing                                                                
                                                            /> </td>
                                                            <td>
                                                                <ContentEditable innerRef={this.contentEditable}
                                                                    html={oneLineItem.name}
                                                                    disabled={false}
                                                                    headername={"name"}
                                                                    indexnumber={index}
                                                                    onChange={this.handleContentEditableUpdate} />
                                                            </td>
                                                            <td>
                                                                <ContentEditable innerRef={this.contentEditable}
                                                                    html={oneLineItem.no}
                                                                    disabled={false}
                                                                    headername={"no"}
                                                                    indexnumber={index}
                                                                    onChange={this.handleContentEditableUpdate} />
                                                            </td>
                                                            <td>
                                                                <ContentEditable innerRef={this.contentEditable}
                                                                    html={oneLineItem.days}
                                                                    disabled={false}
                                                                    headername={"days"}
                                                                    indexnumber={index}
                                                                    onChange={this.handleContentEditableUpdate} />
                                                            </td>
                                                            <td>
                                                                <ContentEditable innerRef={this.contentEditable}
                                                                    html={oneLineItem.rate}
                                                                    disabled={false}
                                                                    headername={"rate"}
                                                                    indexnumber={index}
                                                                    onChange={this.handleContentEditableUpdate} />
                                                            </td>
                                                            <td>
                                                                <ContentEditable innerRef={this.contentEditable}
                                                                    html={oneLineItem.travelDays}
                                                                    disabled={false}
                                                                    headername={"travelDays"}
                                                                    indexnumber={index}
                                                                    onChange={this.handleContentEditableUpdate} />
                                                            </td>
                                                            <td>
                                                                <ContentEditable innerRef={this.contentEditable}
                                                                    html={oneLineItem.travelRates}
                                                                    disabled={false}
                                                                    headername={"travelRates"}
                                                                    indexnumber={index}
                                                                    onChange={this.handleContentEditableUpdate} />
                                                            </td>
                                                            <td>
                                                                <ContentEditable innerRef={this.contentEditable}
                                                                    html={oneLineItem.travelPays}
                                                                    disabled={false}
                                                                    headername={"travelPays"}
                                                                    indexnumber={index}
                                                                    onChange={this.handleContentEditableUpdate} />
                                                            </td>
                                                            <td>
                                                                <ContentEditable innerRef={this.contentEditable}
                                                                    html={oneLineItem.otHours}
                                                                    disabled={false}
                                                                    headername={"otHours"}
                                                                    indexnumber={index}
                                                                    onChange={this.handleContentEditableUpdate} />
                                                            </td>
                                                            <td>
                                                                <ContentEditable innerRef={this.contentEditable}
                                                                    html={oneLineItem.ot}
                                                                    disabled={false}
                                                                    headername={"ot"}
                                                                    indexnumber={index}
                                                                    onChange={this.handleContentEditableUpdate} />
                                                            </td>
                                                            <td>
                                                                <ContentEditable innerRef={this.contentEditable}
                                                                    html={oneLineItem.estimate}
                                                                    disabled={false}
                                                                    headername={"estimate"}
                                                                    indexnumber={index}
                                                                    onChange={this.handleContentEditableUpdate} />
                                                            </td>
                                                            <td>
                                                                <ContentEditable innerRef={this.contentEditable}
                                                                    html={oneLineItem.actual}
                                                                    disabled={false}
                                                                    headername={"actual"}
                                                                    indexnumber={index}
                                                                    onChange={this.handleContentEditableUpdate} />
                                                            </td>
                                                            <td>
                                                                <Button indexnumber={index} onClick={this.removeLineItemsMethod} variant="danger">-</Button>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
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