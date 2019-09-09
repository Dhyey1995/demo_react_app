import React, { Component } from 'react'
import Axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const leftDiv = { float: 'left' }; 
const rightDiv = { float: 'right' };


export default class AddBudgetFrom extends Component {
    constructor(props){
        super(props);
        this.state = {
            errors:{projectname:'',clientname:'',clientcountry:'',clientaddress:'',producers:'',brandmanager:'',emailid:'',director:'',cameraassistant:'',buildstrikedays:'',prelightdays:'',studioshootdays:'',locationdays:'',prelighthours:'',studioshoothours:'',locationhours:'',locations:'',fullname:'',designation:'',invitemsg:''},
            allCountrys:[],            
            projectname:'',clientname:'',clientcountry:'',clientaddress:'',producers:'',
            brandmanager:'',emailid:'',director:'',cameraassistant:'',buildstrikedays:'',
            prelightdays:'',studioshootdays:'',locationdays:'',prelighthours:'',
            studioshoothours:'',locationhours:'',locations:'',fullname:'',designation:'',invitemsg:'',
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();    
        let formData = {
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

        };       
        
        Axios.post("https://betasite.online/laravelAPI/api/budget",formData)
            .then(({ data }) => {
            //alert(data.message);
            if (data.status) {
                alert("Budget Added successfully");
            } else {
                alert("something went wrong");  
            }        
        });  
    }

    handleInputChange = (event) => {
        event.preventDefault();

        const { name, value } = event.target;
        let errors = this.state.errors;

        
        
        
        this.setState({
            [event.target.name]:event.target.value
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

    render() {
        return (
            <div className="dashboard-wrapper">
                <div className="container-fluid  dashboard-content">
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="page-header">
                                <h2 className="pageheader-title">Tabs</h2>
                            </div>
                        </div>
                    </div>

    <div className="row">
        <div className="col-md-12">
            <form className="form-horizontal" method="POST" onSubmit={this.handleSubmit}>
                <div className="col-sm-12">
                    <div className="col-sm-6" style={leftDiv}>
                        <div className="form-group">
                            <label className="control-label col-sm-4">Project / Film Name:</label>
                            <div className="col-sm-10">
                                <input onChange={this.handleInputChange} value={this.state.projectname} type="text" className="form-control" placeholder="" name="projectname" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-4">Client Logo:</label>
                            <div className="col-sm-10">
                                <input type="file" ref={this.logo} name="logo" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-4">Client Address:</label>
                            <div className="col-sm-10">
                                <input onChange={this.handleInputChange} value={this.state.clientaddress} type="text" className="form-control" placeholder="" name="clientaddress" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-4">Brand Manager:</label>
                            <div className="col-sm-10">
                                <input onChange={this.handleInputChange} value={this.state.brandmanager} type="text" className="form-control" placeholder="" name="brandmanager" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-4">Director:</label>
                            <div className="col-sm-10">
                                <input onChange={this.handleInputChange} value={this.state.director} type="text" className="form-control" placeholder="" name="director" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-4">Camera Assistant:</label>
                            <div className="col-sm-10">
                                <input onChange={this.handleInputChange} value={this.state.cameraassistant} type="text" className="form-control" placeholder="" name="cameraassistant" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-4">Pre Light Days:</label>
                            <div className="col-sm-10">
                                <input onChange={this.handleInputChange} value={this.state.prelightdays} type="text" className="form-control" placeholder="" name="prelightdays" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-4">Location Days:</label>
                            <div className="col-sm-10">
                                <input onChange={this.handleInputChange} value={this.state.locationdays}  type="text" className="form-control" placeholder="" name="locationdays" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-4">Studio Shoot Hours:</label>
                            <div className="col-sm-10">
                                <input onChange={this.handleInputChange} value={this.state.studioshoothours}  type="text" className="form-control" placeholder="" name="studioshoothours" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-4">Locations:</label>
                            <div className="col-sm-10">
                                <input onChange={this.handleInputChange} value={this.state.locations} type="text" className="form-control" placeholder="" name="locations" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-4">Designation:</label>
                            <div className="col-sm-10">
                                <input onChange={this.handleInputChange} value={this.state.designation} type="text" className="form-control" placeholder="" name="designation" />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6" style={rightDiv}>
                        <div className="form-group">
                            <label className="control-label col-sm-4">Brand / Client Name:</label>
                            <div className="col-sm-10">
                                <input onChange={this.handleInputChange} value={this.state.clientname} type="text" className="form-control" placeholder="" name="clientname" />
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
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-4">Producers:</label>
                            <div className="col-sm-10">
                                <input onChange={this.handleInputChange} value={this.state.producers} type="text" className="form-control" placeholder="" name="producers" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-4">Email Id:</label>
                            <div className="col-sm-10">
                                <input onChange={this.handleInputChange} value={this.state.emailid} type="text" className="form-control" placeholder="" name="emailid" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-4">DOP:</label>
                            <div className="col-sm-10">
                            <DatePicker selected={this.state.dop} className="form-control" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-4">Build / Strike days:</label>
                            <div className="col-sm-10">
                                <input onChange={this.handleInputChange} value={this.state.buildstrikedays} type="text" className="form-control" placeholder="" name="buildstrikedays" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-4">Studio Shoot Days:</label>
                            <div className="col-sm-10">
                                <input onChange={this.handleInputChange} value={this.state.studioshootdays} type="text" className="form-control" placeholder="" name="studioshootdays" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-4">Prelight Hours:</label>
                            <div className="col-sm-10">
                                <input onChange={this.handleInputChange} value={this.state.prelighthours}  type="text" className="form-control" placeholder="" name="prelighthours" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-4">Location Hours:</label>
                            <div className="col-sm-10">
                                <input onChange={this.handleInputChange} value={this.state.locationhours}  type="text" className="form-control" placeholder="" name="locationhours" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-4">Full Name:</label>
                            <div className="col-sm-10">
                                <input onChange={this.handleInputChange} value={this.state.fullname}  type="text" className="form-control" placeholder="" name="fullname" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-4">Invite Message:</label>
                            <div className="col-sm-10">
                                <input onChange={this.handleInputChange} value={this.state.invitemsg}  type="text" className="form-control" placeholder="" name="invitemsg" />
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
