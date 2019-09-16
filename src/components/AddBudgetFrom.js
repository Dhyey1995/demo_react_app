import React, { Component } from 'react'
import Axios from 'axios';
import FormData from 'form-data';
import swal from 'sweetalert';
import DatePicker from "react-datepicker";
import LocalStorage from 'localStorage';
import { Redirect } from 'react-router';

import "react-datepicker/dist/react-datepicker.css";

const leftDiv = { float: 'left' }; 
const rightDiv = { float: 'right' };
const errorClass = { color: 'red' };

const emailReg = RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);

const validation = (formData , errorData)  => {
    let valid = true ;
    let empty_fields = [];
    Object.entries(formData).forEach((field_data) => {
        if(field_data[1] === '') {
            valid = false ;
            empty_fields.push(field_data[0]);
        }
    });

    Object.entries(errorData).forEach((field_data) => {
        if(field_data[1] !== '') {
            valid = false ;
            empty_fields.push(field_data[0]);
        }
    });

    return empty_fields ;
}

export default class AddBudgetFrom extends Component {
    constructor(props){
        super(props);
        this.state = {
            errors:{projectname:'',dop:'',clientname:'',clientcountry:'',clientaddress:'',producers:'',brandmanager:'',emailid:'',director:'',cameraassistant:'',buildstrikedays:'',prelightdays:'',studioshootdays:'',locationdays:'',prelighthours:'',studioshoothours:'',locationhours:'',locations:'',fullname:'',designation:'',invitemsg:''},
            allCountrys:[],   
            selectedFiles:'',     
            loader:'',
            projectname:'',clientname:'',clientcountry:'',clientaddress:'',producers:'',
            brandmanager:'',emailid:'',director:'',cameraassistant:'',buildstrikedays:'',
            prelightdays:'',studioshootdays:'',locationdays:'',prelighthours:'',
            studioshoothours:'',locationhours:'',locations:'',fullname:'',designation:'',invitemsg:'',dop:'',
            BudgetID:'',updateBudgetStatus:false
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();    
        let formInputData = {
            projectname:this.state.projectname,
            clientname:this.state.clientname,
            clientcountry:this.state.clientcountry,
            clientaddress:this.state.clientaddress,
            producers:this.state.producers,
            brandmanager:this.state.brandmanager,
            emailid:this.state.emailid,
            director:this.state.director,
            cameraassistant:this.state.cameraassistant,
            buildstrikedays:this.state.buildstrikedays,
            prelightdays:this.state.prelightdays,
            studioshootdays:this.state.studioshootdays,
            locationdays:this.state.locationdays,
            prelighthours:this.state.prelighthours,
            studioshoothours:this.state.studioshoothours,
            locationhours:this.state.locationhours,
            locations:this.state.locations,
            fullname:this.state.fullname,
            designation:this.state.designation,
            invitemsg:this.state.invitemsg,
            dop:this.state.dop,
        };


        let logo_image = this.state.selectedFiles;

        var logoUpload = new FormData();
        logoUpload.append("logo_image", logo_image);
        logoUpload.append('projectname',formInputData.projectname);
        logoUpload.append('clientname',formInputData.clientname);
        logoUpload.append('clientcountry',formInputData.clientcountry);
        logoUpload.append('clientaddress',formInputData.clientaddress);
        logoUpload.append('producers',formInputData.producers);
        logoUpload.append('brandmanager',formInputData.brandmanager);
        logoUpload.append('emailid',formInputData.emailid);
        logoUpload.append('director',formInputData.director);
        logoUpload.append('cameraassistant',formInputData.cameraassistant);
        logoUpload.append('buildstrikedays',formInputData.buildstrikedays);
        logoUpload.append('prelightdays',formInputData.prelightdays);
        logoUpload.append('studioshootdays',formInputData.studioshootdays);
        logoUpload.append('locationdays',formInputData.locationdays);
        logoUpload.append('prelighthours',formInputData.prelighthours);
        logoUpload.append('studioshoothours',formInputData.studioshoothours);
        logoUpload.append('locationhours',formInputData.locationhours);
        logoUpload.append('locations',formInputData.locations);
        logoUpload.append('fullname',formInputData.fullname);
        logoUpload.append('designation',formInputData.designation);
        logoUpload.append('dop',formInputData.dop);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        let validation_res = validation(formInputData , this.state.errors );
        if (!validation_res.length) {
            Axios.post("https://betasite.online/laravelAPI/api/budget",logoUpload,config)
                .then(({ data }) => {
                if (data.status) {
                    LocalStorage.setItem('budgetID',data.last_inserted_id);
                    swal("Success", "Budget Added successfully", "success");
                    this.setState({ updateBudgetStatus:true });
                } else {
                    swal("Oops...", "something went wrong", "error");
                }        
            });
        } else {
            swal("Oops...", "fill in all the needed fields before you submit","error");
        }        
    }

    handleInputChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors; 
        switch (name) {
            case 'projectname': errors.projectname = (value.length < 5 && value.length > 0) ? 'this field must be 5 characters long!' : '';break;
            case 'clientname': errors.clientname = (value.length < 5 && value.length > 0) ? 'this field must be 5 characters long!' : '';break;
            case 'clientcountry': errors.clientcountry = (value.length > 0) ? '' : 'Select Country';break;
            case 'clientaddress': errors.clientaddress = (value.length < 10 && value.length > 0) ? 'this field must be 5 characters long!' : '';break;
            case 'producers': errors.producers = (value.length < 5 && value.length > 0) ? 'this field must be 5 characters long!' : '';break;
            case 'brandmanager': errors.brandmanager = (value.length < 5 && value.length > 0) ? 'this field must be 5 characters long!' : '';break;
            case 'emailid': errors.emailid = (emailReg.test(value) && value.length > 0) ? '' : 'Email id is not valid';break;
            case 'director': errors.director = (value.length < 5 && value.length > 0) ? 'this field must be 5 characters long!' : '';break;
            case 'cameraassistant': errors.cameraassistant = (value.length < 5 && value.length > 0) ? 'this field must be 5 characters long!' : '';break;
            case 'buildstrikedays': errors.buildstrikedays = (value.length > 0) ? '' : 'this field is required';break; 
            case 'prelightdays': errors.prelightdays = (value.length > 0) ? '' : 'this field is required';break;
            case 'studioshootdays': errors.studioshootdays = (value.length > 0) ? '' : 'this field is required';break;
            case 'locationdays': errors.locationdays = (value.length > 0) ? '' : 'this field is required';break;
            case 'prelighthours': errors.prelighthours = (value.length > 0) ? '' : 'this field is required';break;
            case 'studioshoothours': errors.studioshoothours = (value.length > 0) ? '' : 'this field is required';break;
            case 'locationhours': errors.locationhours = (value.length > 0) ? '' : 'this field is required';break;
            case 'locations': errors.locations = (value.length < 5 && value.length > 0) ? 'this field must be 5 characters long!' : '';break;
            case 'fullname': errors.fullname = (value.length < 5 && value.length > 0) ? 'this field must be 5 characters long!' : '';break;
            case 'designation': errors.designation = (value.length < 5 && value.length > 0) ? 'this field must be 5 characters long!' : '';break;
            case 'invitemsg': errors.invitemsg = (value.length < 5 && value.length > 0) ? 'this field must be 5 characters long!' : '';break;
            default:break;
        }
        this.setState({errors,[name]: value});

        this.setState({
            [event.target.name]:event.target.value
        });
    }

    handleChangeDop = (event) => {
        var date = new Date(event),mnth = ("0" + (date.getMonth() + 1)).slice(-2),day = ("0" + date.getDate()).slice(-2);
        this.setState({
            dop:[day, mnth , date.getFullYear()].join("-")
        });   
    }

    componentDidMount(){
        Axios.get("https://betasite.online/laravelAPI/api/country")
            .then(({ data }) => {
            this.setState({
                allCountrys:data.data
            });
        });        
    }

    logoUploadMethod = event => {
        this.setState({
            selectedFiles:event.target.files[0]
        });
    }

    render() {
        if( this.state.updateBudgetStatus ){
            return <Redirect to='/select_template' />;
        }
        return (
            <div className="dashboard-wrapper">
                <div className="container-fluid  dashboard-content">
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="page-header">
                                <h2 className="pageheader-title">Add new budget</h2>
                            </div>
                        </div>
                    </div>  
    <div className="row">
        <div className="col-md-12">
            <form className="form-horizontal" encType="multipart/form-data" method="POST" onSubmit={this.handleSubmit}>
                <div className="col-sm-12">
                    <div className="col-sm-6" style={leftDiv}>
                        <div className="form-group">
                            <label className="control-label col-sm-4">Project / Film Name:</label>
                            <div className="col-sm-10">
                                <input autoComplete="off" onChange={this.handleInputChange} value={this.state.projectname} type="text" className="form-control" placeholder="" name="projectname" />
                                <p style={errorClass}>{this.state.errors.projectname}</p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-4">Client Logo:</label>
                            <div className="col-sm-10">
                                <input type="file" name="logo_file" onChange={this.logoUploadMethod} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-4">Client Address:</label>
                            <div className="col-sm-10">
                                <input onChange={this.handleInputChange} value={this.state.clientaddress} type="text" className="form-control" placeholder="" name="clientaddress" />
                                <p style={errorClass}>{this.state.errors.clientaddress}</p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-4">Brand Manager:</label>
                            <div className="col-sm-10">
                                <input onChange={this.handleInputChange} value={this.state.brandmanager} type="text" className="form-control" placeholder="" name="brandmanager" />
                                <p style={errorClass}>{this.state.errors.brandmanager}</p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-4">Director:</label>
                            <div className="col-sm-10">
                                <input onChange={this.handleInputChange} value={this.state.director} type="text" className="form-control" placeholder="" name="director" />
                                <p style={errorClass}>{this.state.errors.director}</p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-4">Camera Assistant:</label>
                            <div className="col-sm-10">
                                <input onChange={this.handleInputChange} value={this.state.cameraassistant} type="text" className="form-control" placeholder="" name="cameraassistant" />
                                <p style={errorClass}>{this.state.errors.cameraassistant}</p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-4">Pre Light Days:</label>
                            <div className="col-sm-10">
                                <input onChange={this.handleInputChange} value={this.state.prelightdays} type="number" className="form-control" placeholder="" name="prelightdays" />
                                <p style={errorClass}>{this.state.errors.prelightdays}</p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-4">Location Days:</label>
                            <div className="col-sm-10">
                                <input onChange={this.handleInputChange} value={this.state.locationdays}  type="number" className="form-control" placeholder="" name="locationdays" />
                                <p style={errorClass}>{this.state.errors.locationdays}</p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-4">Studio Shoot Hours:</label>
                            <div className="col-sm-10">
                                <input onChange={this.handleInputChange} value={this.state.studioshoothours}  type="number" className="form-control" placeholder="" name="studioshoothours" />
                                <p style={errorClass}>{this.state.errors.studioshoothours}</p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-4">Locations:</label>
                            <div className="col-sm-10">
                                <input onChange={this.handleInputChange} value={this.state.locations} type="text" className="form-control" placeholder="" name="locations" />
                                <p style={errorClass}>{this.state.errors.locations}</p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-4">Designation:</label>
                            <div className="col-sm-10">
                                <input onChange={this.handleInputChange} value={this.state.designation} type="text" className="form-control" placeholder="" name="designation" />
                                <p style={errorClass}>{this.state.errors.designation}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6" style={rightDiv}>
                        <div className="form-group">
                            <label className="control-label col-sm-4">Brand / Client Name:</label>
                            <div className="col-sm-10">
                                <input onChange={this.handleInputChange} value={this.state.clientname} type="text" className="form-control" placeholder="" name="clientname" />
                                <p style={errorClass}>{this.state.errors.clientname}</p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-4">Client Country:</label>
                            <div className="col-sm-10">
                            <select onChange={this.handleInputChange} className="form-control" name="clientcountry" >
                            <option value="">Please Select</option>
                                {this.state.allCountrys.map(function(country , index){
                                    return <option key={index} value={country.id}>{country.name}</option>;
                                })}  
                            </select>
                            <p style={errorClass}>{this.state.errors.clientcountry}</p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-4">Producers:</label>
                            <div className="col-sm-10">
                                <input onChange={this.handleInputChange} value={this.state.producers} type="text" className="form-control" placeholder="" name="producers" />
                                <p style={errorClass}>{this.state.errors.producers}</p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-4">Email Id:</label>
                            <div className="col-sm-10">
                                <input onChange={this.handleInputChange} value={this.state.emailid} type="text" className="form-control" placeholder="" name="emailid" />
                                <p style={errorClass}>{this.state.errors.emailid}</p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-4">DOP:</label>
                            <div className="col-sm-10">
                            <DatePicker className="form-control" value={this.state.dop} onChange={this.handleChangeDop} onSelect={this.handleDateSelect} />
                            <p style={errorClass}>{this.state.errors.dop}</p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-4">Build / Strike days:</label>
                            <div className="col-sm-10">
                                <input onChange={this.handleInputChange} value={this.state.buildstrikedays} type="number" className="form-control" placeholder="" name="buildstrikedays" />
                                <p style={errorClass}>{this.state.errors.buildstrikedays}</p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-4">Studio Shoot Days:</label>
                            <div className="col-sm-10">
                                <input onChange={this.handleInputChange} value={this.state.studioshootdays} type="number" className="form-control" placeholder="" name="studioshootdays" />
                                <p style={errorClass}>{this.state.errors.studioshootdays}</p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-4">Prelight Hours:</label>
                            <div className="col-sm-10">
                                <input onChange={this.handleInputChange} value={this.state.prelighthours}  type="number" className="form-control" placeholder="" name="prelighthours" />
                                <p style={errorClass}>{this.state.errors.prelighthours}</p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-4">Location Hours:</label>
                            <div className="col-sm-10">
                                <input onChange={this.handleInputChange} value={this.state.locationhours}  type="number" className="form-control" placeholder="" name="locationhours" />
                                <p style={errorClass}>{this.state.errors.locationhours}</p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-4">Full Name:</label>
                            <div className="col-sm-10">
                                <input onChange={this.handleInputChange} value={this.state.fullname}  type="text" className="form-control" placeholder="" name="fullname" />
                                <p style={errorClass}>{this.state.errors.fullname}</p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-4">Invite Message:</label>
                            <div className="col-sm-10">
                                <input onChange={this.handleInputChange} value={this.state.invitemsg}  type="text" className="form-control" placeholder="" name="invitemsg" />
                                <p style={errorClass}>{this.state.errors.invitemsg}</p>
                            </div>
                        </div>
                    </div>
                    <input type="submit" value="Submit"/>
                </div>
            </form>   
        </div>
    </div>

                </div>
            </div>
        )
    }
}


