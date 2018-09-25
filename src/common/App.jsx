import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import API from "../lib/API";
import LinkStore from "../stores/LinkStore";
import Main from "./Main.jsx";
import Home from "./Home.jsx";
import ProductList from "./ProductList.jsx";
import Report from "./Report.jsx";
import Profile from "./Profile.jsx";
import ProductPageWrapper from "./ProductPageWrapper.jsx";

let _getAppState = () => {
  return { links: LinkStore.getAll() };
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = _getAppState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    API.fetchLink();
    LinkStore.on("change", this.onChange);
  }

  componentWillMount() {
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
          <Route
            path="/listing"
            render={() => <ProductList products={this.state.links} />}
          />
          <Route path="/listing/:id" component={ProductPageWrapper} />
          <Route path="/report" component={Report} />
          <Route path="/profile" component={Profile} />
        </Main>
      </Router>
    );
  }
}

export default App;
