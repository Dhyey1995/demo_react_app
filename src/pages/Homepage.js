import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { ButtonInput } from 'react-bootstrap';
import Axios from 'axios';
import NavHader from '../components/NavHader.js';
import MemberPlan from '../components/MemberPlan.js';



export default class Homepage extends Component {

    constructor(props){
        super(props);
        this.state = {
            allCountrys:[],register_id:'',
            planData:[],
            nameError:'',company_name:'',email:'',country:'',address:'',owner:'0',phone_no:'',website_url:'',
            teamName:[],
            teamEmail:[],
            tab_1:true,tab_2:false,tab_3:false,
            name:'',company_name:'',email:'',country:'',address:'',owner:'0',phone_no:'',website_url:'',
        };
    }

    validate = () => {
        let nameError = '';
        (!this.state.name) ? nameError = 'name is requird' : nameError = '';

        if(nameError){
           this.setState({nameError});
           return false ; 
        } 
        return true ;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
        
        if (this.validate()) {
            let formData = {
                address:this.state.address,company_name:this.state.company_name,
                country:this.state.country,email:this.state.email,
                name:this.state.name,owner:this.state.owner,
                phone_no:this.state.phone_no,website_url:this.state.website_url,
            };
            Axios.post("https://betasite.online/laravelAPI/api/register",formData)
                .then(({ data }) => {
                alert(data.message);
                if (data.status) {
                    this.setState({
                        tab_1:false,tab_2:true,tab_3:false,
                        register_id:data.last_inserted_id,
                    });
                } else {
                    alert("something went wrong");  
                }        
            });    
        } else {
            
        }
        
          
    }
    componentDidMount(){
        Axios.get("https://betasite.online/laravelAPI/api/country")
            .then(({ data }) => {
            this.setState({
                allCountrys:data.data
            });
        });   
        Axios.get("https://betasite.online/laravelAPI/api/membership_plan")
            .then(({ data }) => {
            this.setState({
                planData:data.data
            });
        });   
    }

    selectPlanMethod = (event) => {
        let formData = {
            paln_id:event.target.value,user_id:this.state.register_id
        };        
        Axios.patch("https://betasite.online/laravelAPI/api/register/"+this.state.register_id,{paln_id:event.target.value},{'Content-Type': 'application/x-www-form-urlencoded'})
            .then(respones => {
                if (respones.data.status) {
                    this.setState({
                        tab_1:false,tab_2:false,tab_3:true,
                    });
            } 
        });
    }
    
    handelInputChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]:event.target.value
        });
    }
    
    submitTeam = (event) => {
        event.preventDefault();
        let dataPayload = {
            user_id:this.state.register_id,
            teamData:this.state.teamName
        }
        Axios.post("https://betasite.online/laravelAPI/api/team_by_user",dataPayload,{'Content-Type': 'application/x-www-form-urlencoded'})
            .then(respones => {
                console.log(respones);
                alert(respones.data.message);
        });
    }

    addTeamData = () => {
        this.setState({
            teamName: [...this.state.teamName , ""]
        })
    }
    teamHendleChange = (event , index) => {
        event.preventDefault();
        this.state.teamName[index] = event.target.value
        this.setState({
            teamName:this.state.teamName
        })
    }

    render() {
        return (
            <div className="dashboard-main-wrapper">
                <div className="dashboard-header">
                    <NavHader />
                    <div className="nav-left-sidebar sidebar-dark">
                        <div className="menu-list">
                            <li>
                                <div className="conntection-footer">
                                    <NavLink to={'/'}>Dashboard</NavLink>
                                </div>
                            </li>
                        </div>
                    </div>
                </div>
                <div className="dashboard-wrapper">
                    <div className="container-fluid  dashboard-content">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="page-header">
                                <h2 className="pageheader-title">Tabs</h2>
                                <p className="pageheader-text">Proin placerat ante duiullam scelerisque a velit ac porta, fusce sit amet vestibulum mi. Morbi lobortis pulvinar quam.</p>
                                <div className="page-breadcrumb">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="#" className="breadcrumb-link">Dashboard</a></li>
                                    <li className="breadcrumb-item"><a href="#" className="breadcrumb-link">UI Elements</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">From</li>
                                    </ol>
                                </nav>
                                </div>
                            </div>
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="col-md-12">
                                <div className="tab-regular">
                                    <ul className="nav nav-tabs " id="myTab" role="tablist">
                                    <li className="nav-item">
                                        <a className={'nav-link' + (this.state.tab_1 ? " active" : "")} id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Profile</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className={'nav-link' + (this.state.tab_2 ? " active" : "")} id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Select plan</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className={'nav-link' + (this.state.tab_3 ? " active" : "")} id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Add Team</a>
                                    </li>
                                    </ul>
                                    <div className="tab-content" id="myTabContent">
                                        <div className={'tab-pane fade' + (this.state.tab_1 ? " show active" : "")} id="home" role="tabpanel" aria-labelledby="home-tab">
                                            <form className="form-horizontal" method="POST" onSubmit={this.handleSubmit}>
                                                <div className="form-group">
                                                    <label className="control-label col-sm-4">Full name :</label>
                                                    <div className="col-sm-10">
                                                        <input onChange={this.handelInputChange} type="text" className="form-control" placeholder="" value={this.state.name} name="name" />
                                                        <p style={{ color: 'red' }}>{this.state.nameError ? this.state.nameError : ''}</p>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label col-sm-4">Company name :</label>
                                                    <div className="col-sm-10">
                                                        <input onChange={this.handelInputChange} type="text" className="form-control" placeholder="" value={this.state.company_name} name="company_name" />
                                                    </div>
                                                </div>
                                                
                                                <div className="form-group">
                                                    <label className="control-label col-sm-4">Country :</label>
                                                    <div className="col-sm-10">
                                                    <select onChange={this.handelInputChange} className="form-control" name="country" >
                                                    <option value="">---Select Country---</option>
                                                        {this.state.allCountrys.map(function(country , index){
                                                            return <option key={index} value={country.id}>{country.name}</option>
                                                        })}  
                                                    </select>
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <label className="control-label col-sm-4">Address :</label>
                                                    <div className="col-sm-10">
                                                        <input onChange={this.handelInputChange} type="text" value={this.state.address} className="form-control" placeholder="" name="address" />
                                                    </div>
                                                </div>


                                                <div className="form-group">
                                                    <label className="control-label col-sm-4">Owner :</label>
                                                    <div className="col-sm-10">
                                                        <label className="custom-control custom-radio">
                                                            <input onChange={this.handelInputChange} type="radio" value={this.state.owner} defaultChecked name="owner" value={1} className="custom-control-input" /><span className="custom-control-label">Yes</span>
                                                        </label>
                                                        <label className="custom-control custom-radio">
                                                            <input onChange={this.handelInputChange} type="radio" value={this.state.owner} name="owner" value={0} className="custom-control-input" /><span className="custom-control-label">No</span>
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <label className="control-label col-sm-4">Phone numebr :</label>
                                                    <div className="col-sm-10">
                                                        <input onChange={this.handelInputChange} type="number" value={this.state.phone_no} className="form-control" placeholder="" name="phone_no" />
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <label className="control-label col-sm-4">email :</label>
                                                    <div className="col-sm-10">
                                                        <input onChange={this.handelInputChange} type="text" className="form-control" placeholder="" value={this.state.email} name="email" />
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <label className="control-label col-sm-4">Website URL :</label>
                                                    <div className="col-sm-10">
                                                        <input onChange={this.handelInputChange} type="text" className="form-control" placeholder="" value={this.state.website_url} name="website_url" />
                                                    </div>
                                                </div>          
                                                
                                                <div className="form-group">        
                                                    <div className="col-sm-offset-2 col-sm-10">
                                                        <button type="submit" className="btn btn-default">Submit and proceed</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div className={'tab-pane fade' + (this.state.tab_2 ? " show active" : "")} id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                            <div className="row">
                                                {this.state.planData.map((plan , index) => <div key={index} className="col-md-4">
                                                    <div className="card">
                                                        <div className="card-header bg-primary text-center p-3 ">
                                                            <h4 className="mb-0 text-white">{plan.plan_name}</h4>
                                                        </div>
                                                        <div className="card-body text-center">
                                                            <h1 className="mb-1">${plan.price}</h1>
                                                            <p> {plan.template_limit} template </p>
                                                        </div>
                                                        <div className="card-body border-top">
                                                            <ul className="list-unstyled bullet-check font-14">
                                                            <li>{plan.desc_one}</li>
                                                            {/* <li>{plan.desc_two}</li>
                                                            <li>{plan.desc_three}</li>
                                                            <li>{plan.desc_four}</li>
                                                            <li>{plan.desc_five}</li>
                                                            <li>{plan.desc_six}</li> */}
                                                            </ul>
                                                            <button value={plan.id} onClick={this.selectPlanMethod} className={"btn btn-outline-secondary btn-block btn-lg"}>Get started</button>
                                                        </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className={'tab-pane fade' + (this.state.tab_3 ? " show active" : "")} id="contact" role="tabpanel" aria-labelledby="contact-tab">
                                            
                                            <button onClick={(event) => this.addTeamData(event)} className="btn btn-default">Add new</button>

                                            <form className="form-horizontal" method="POST" onSubmit={this.submitTeam}>
                                                            
                                                {this.state.teamName.map((tname , index) => {
                                                    return (
                                                        <div key={index} className="form-group row"> 
                                                            <div className="col-sm-4">
                                                                <input type="text" onChange={(event)=>this.teamHendleChange(event,index)} value={tname} className="form-control" placeholder="Email ID" />
                                                            </div>
                                                        </div>

                                                    )
                                                })}

                                                <div className="form-group">        
                                                    <button type="submit" className="btn btn-default">Submit and proceed</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
