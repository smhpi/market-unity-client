import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import API from '../lib/API';
import LinkStore from '../stores/LinkStore';
import Main from './Main';
import Home from './Home';
import ProductList from './ProductList';
import Login from './Login';


let _getAppState = () => {
    return { links: LinkStore.getAll()}
  }
  
  class App extends Component {
    constructor(props) {
      super(props);
      this.state = _getAppState();
      this.onChange = this.onChange.bind(this);
    }
  
    componentDidMount(){
      API.fetchLink();
      LinkStore.on("change" , this.onChange)
  }
  
  componentWillMount(){
      LinkStore.removeAllListeners("change", this.onChange);
  }
  
  onChange() {
      console.log("4- in the view");
      this.setState(_getAppState());
  }
    render() {
        return (
            <Router>
                <Main>
                <Route exact={true} path="/" component={Home} />
                <Route path="/listing" render={ () => <ProductList 
                                                        products = {this.state.links}
                                                        /> } 
                />
                <Route path="/login" component={Login} />
               </Main>

            </Router>
        );
    }
}

export default App;
