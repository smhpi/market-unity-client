import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Col, Panel } from 'react-bootstrap';

function Product(props) {
  let { product } = props;
  return (
    <Col
      lg={3}
      md={4}
      sm={6}>
      <Panel className="product">
        <div className="product-img-wrapper">
        <Link to={"/shop/"+product.id}>
            <img
              alt={product.title}
              className="img-responsive product-img"
              src={product.image.src} />
        </Link>
        </div>

        <h4
          className="ellipsis"
          title={product.title}>
          <Link to={"/shop/"+product.id}>
            {product.title}
          </Link>
        </h4>

        <h5
          className="ellipsis product-brand-name"
          title={product.vendor}>
          {`by ${product.vendor}`}
        </h5>

        <div className="h4 product-price">
          {`${product.variants[0].price}$`}
        </div>
        <div className="h4 product-price">
          {`Shopify Qt:${product.variants[0].inventory_quantity}`}
        </div>
      </Panel>
    </Col>
  );
}

Product.propTypes = {
  product: PropTypes.object.isRequired
};

export default Product;