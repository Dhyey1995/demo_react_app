import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';

class LoginGmail extends Component {
    constructor(props){
        super(props);
        this.state = {
            gmailUserData:'',
        }
    }

    responseGoogle = response => {
        this.setState({
            gmailUserData:response.profileObj
        });
    }

    render() {
        if (this.state.gmailUserData != '') {
            this.props.getLogindata(this.state.gmailUserData);
        }
        return (
            <GoogleLogin
                clientId="1084915128402-hmcgfeeur0ls7t8dko781qf28rf6nb18.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
            />
        );
    }
}

export default LoginGmail;