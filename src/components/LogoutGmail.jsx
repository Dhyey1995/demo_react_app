import React, { Component } from 'react';
import { GoogleLogout } from 'react-google-login';

class LogoutGmail extends Component {

    constructor(props){
        super(props);
    }

    logout = response => {
        alert("Your account has been logout");       
    }
    render() {
        return (
            <GoogleLogout
                clientId="1084915128402-hmcgfeeur0ls7t8dko781qf28rf6nb18.apps.googleusercontent.com"
                buttonText="Logout"
                onLogoutSuccess={this.logout}
                cookiePolicy={'single_host_origin'}
            >
            </GoogleLogout>
        );
    }
}

export default LogoutGmail;