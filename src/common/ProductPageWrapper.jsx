import React, { Component } from "react";

import ProductPage from "./ProductPage.jsx";
import API from "../lib/API";
import LinkStore from "../stores/LinkStore";

let _getAppState = () => {
  return { links: LinkStore.getAll() };
};

class ProductPageWrapper extends Component {
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
    const productsDetails = this.state.links;
    const {
      match: { params }
    } = this.props;
    const id = params.id;

    const product = productsDetails.filter(product => {
      if (product.id === id) {
        return product;
      } else {
        <div className="text-center">
          <h1>The product couldn't be found.</h1>
        </div>;
      }
    });

    return <ProductPage product={product[0]} />;
  }
}

export default ProductPageWrapper;
