import React, { Component } from 'react';
import { Redirect } from 'react-router';
import LoginGmail from './LoginGmail';
import LogoutGmail from './LogoutGmail';
import Axios from 'axios';

class LoginGmailContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: '',
            redirectTo:''
        }
    }
    gmailLoginData = logindata => {
        if (logindata.error) {
            alert(logindata.error);return ;
        }
        let dataPayload = {
            name: logindata.profileObj.givenName + ' ' + logindata.profileObj.familyName,
            email: logindata.profileObj.email,
            password: logindata.profileObj.googleId,
            remember_token: logindata.tokenObj.id_token
        }
        Axios.post('https://betasite.online/laravelAPI/api/users', dataPayload)
        .then(response => {
            let redirectURL="";response.data.is_new ? redirectURL = "https://gmail.com" : redirectURL = "/" ; 
            this.setState({ userInfo: response.data , redirectTo:redirectURL });
        });
    }

    render() {
        if (this.state.redirectTo) {
            window.location.assign(this.state.redirectTo);
        }
        return (
            <div className="dashboard-wrapper">
                <div className="container-fluid  dashboard-content">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="page-header">
                                <LoginGmail getLogindata={this.gmailLoginData} />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="page-header">
                                <LogoutGmail getLogoutData={this.gmailLogoutData} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginGmailContent;