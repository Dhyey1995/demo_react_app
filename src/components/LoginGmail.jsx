import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';

class LoginGmail extends Component {
    constructor(props){
        super(props);
    }

    responseGoogle = response => {
        this.props.getLogindata(response);
    }

    render() {
        return (
            <GoogleLogin
                clientId="1084915128402-hmcgfeeur0ls7t8dko781qf28rf6nb18.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        );
    }
}
export default LoginGmail;