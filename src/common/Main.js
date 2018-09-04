import React , { Component } from 'react';

import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Header from './Header';
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
        let logo = {fontWeight : "700", fontSize: 40}
        let styles ={color:"red"};
        let btn={marginTop: 7};
        return(
            <div>
                <Header 
                    isAuthenticated = {this.state.isAuthenticated}
                />
                {
                    this.state.isAuthenticated ?(
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <p className="navbar-text">{this.state.user.email}!</p>
                                <Button id="login-button" onClick={this.logout} style={btn}>Logout</Button>
                            </li>
                        </ul> ) : (
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <NavLink exact activeClassName="current" to="/login">Login</NavLink>
                            </li>
                        </ul>
                        )
                }
                {
                    this.state.isAuthenticated ?(
                        <div className="container">
                            {this.props.children}
                        </div>
                    ) : (
                        <div>
                            <div className="container">
                                <div className="omb_login">
                                    <h3 className="omb_authTitle">Login or <a href="#">Sign up</a></h3>
                                    <div className="row omb_row-sm-offset-3 omb_socialButtons">
                                        <div className="col-xs-4 col-sm-2">
                                            
                                                <FacebookLogin
                                                    appId={config.FACEBOOK_APP_ID}
                                                    autoLoad={false}
                                                    fields="name,email,picture"
                                                    callback={this.facebookResponse}
                                                    
                                                />
            
                                        </div>
                                        <div className="col-xs-4 col-sm-2">
                                            <GoogleLogin
                                            clientId={config.GOOGLE_CLIENT_ID}
                                            buttonText="Google+"
                                            className='btn btn-lg btn-block omb_btn-google'
                                            onSuccess={this.googleResponse}
                                            onFailure={this.onFailure}
                                            />
                                        </div>
                                        <div className="col-xs-4 col-sm-2">
                                        <a href="#" className="btn btn-lg btn-block omb_btn-twitter">
                                            <i className="fa fa-twitter visible-xs"></i>
                                            <span className="hidden-xs">Twitter</span>
                                        </a>
                                    </div>
                                    </div>

                                    <div className="row omb_row-sm-offset-3 omb_loginOr">
                                        <div className="col-xs-12 col-sm-6">
                                            <hr className="omb_hrOr"></hr>
                                            <span className="omb_spanOr">or</span>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    )
                }          
            </div>
        )
    }
}
export default Main;