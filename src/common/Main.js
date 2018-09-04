import React , { Component } from 'react';

import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import { NavLink } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import config from '../lib/config.json';

class Main extends Component{

    constructor() {
        super();
        this.state = { isAuthenticated: false, user: null, token: ''};
    }

    logout = () => {
        this.setState({isAuthenticated: false, token: '', user: null})
    };

    onFailure = (error) => {
        alert(error);
    };

    facebookResponse = (response) => {
        const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'});
        const options = {
            method: 'POST',
            body: tokenBlob,
            mode: 'cors',
            cache: 'default'
        };
        fetch('http://localhost:4000/api/v1/auth/facebook', options).then(r => {
            const token = r.headers.get('x-auth-token');
            r.json().then(user => {
                if (token) {
                    this.setState({isAuthenticated: true, user, token})
                }
            });
        })
    };

    googleResponse = (response) => {
        const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'});
        const options = {
            method: 'POST',
            body: tokenBlob,
            mode: 'cors',
            cache: 'default'
        };
        fetch('http://localhost:4000/api/v1/auth/google', options).then(r => {
            const token = r.headers.get('x-auth-token');
            r.json().then(user => {
                if (token) {
                    this.setState({isAuthenticated: true, user, token})
                }
            });
        })
        console.log(response);
    };

    render(){

        return(
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                            <div className="navbar-header">
                                <a className="navbar-brand" href="#">
                                    <img src="../images/logo.png" style={{ maxWidth: 120 }} />
                                </a>
                            </div>
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav">
                                <li>
                                    <NavLink exact activeClassName="current" to="/">Home</NavLink>
                                </li>
                                <li>
                                    <NavLink exact activeClassName="current" to="/login">Login</NavLink>
                                </li>
                                <li>

                                </li>
                            </ul>
                                {
                                    this.state.isAuthenticated ?(
                                        <ul className="nav navbar-nav navbar-right">
                                            <li>
                                                <p className="navbar-text">{this.state.user.email}!</p>
                                                <Button id="login-button" primary onClick={this.logout}>Logout</Button>
                                            </li>
                                        </ul> ) : null
                                }
                        </div>
                     </div>   
                </nav>
                {
                    this.state.isAuthenticated ?(
                        <div className="container">
                            {this.props.children}
                        </div>
                    ) : (
                        <div>
                            <FacebookLogin
                                appId={config.FACEBOOK_APP_ID}
                                autoLoad={false}
                                fields="name,email,picture"
                                callback={this.facebookResponse} />
                            <GoogleLogin
                                clientId={config.GOOGLE_CLIENT_ID}
                                buttonText="Login"
                                onSuccess={this.googleResponse}
                                onFailure={this.onFailure}
                            />
                        </div>
                    )
                }          
            </div>
        )
    }
}
export default Main;