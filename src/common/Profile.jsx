import React, { Component } from 'react';

class Profile extends Component {

    constructor() {
        super();
        this.state = { isAuthenticated: false, user: null, token: ''};
    }

    render() {

        return (
            <div className="App">
                Hello
            </div>
        );
    }
}

export default Profile;
