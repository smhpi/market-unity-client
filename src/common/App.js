import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Main from './Main';
import Home from './Home';
import Login from './Login';


class App extends Component {

    render() {
        return (
            <Router>
                <Main>
                <Route exact={true} path="/" component={Home} />
                <Route path="/login" component={Login} />
               </Main>

            </Router>
        );
    }
}

export default App;
