import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  PageHeader,
  Image,
  Col,
  Panel,
  Media,
  InputGroup,
  FormControl,
  Button
} from "react-bootstrap";

class ProductPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { product } = this.props;

    const PanelHeader = (
      <div className="text-uppercase">
        Price:
        <span className="pull-right">{`${product.variants[0].price}$`}</span>
      </div>
    );
    const PanelFooter = (
      <div>
        <InputGroup>
          <FormControl
            id="qtyInput"
            min="1"
            max="99"
            type="number"
            defaultValue={1}
            ref={ref => {
              this.qtyInput = ref;
            }}
          />
          <InputGroup.Addon>Units</InputGroup.Addon>
        </InputGroup>
        <Button block bsStyle="primary" bsSize="large">
          Add to Cart
        </Button>
      </div>
    );

    return (
      <div>
        <Col sm={12}>
          <PageHeader>{product.title}</PageHeader>
          <Media className="product-page-brand">
            <Media.Left align="middle" />
            <Media.Body>
              <Media.Heading className="product-page-brand-name">
                {product.vendor}
              </Media.Heading>
            </Media.Body>
          </Media>
        </Col>

        <Col sm={8}>
          <div className="product-page-img">
            <Image
              alt={product.title}
              className="img-responsive"
              src={product.image.src}
              thumbnail
            />
          </div>
        </Col>

        <Col sm={4}>
          <Panel footer={PanelFooter} header={PanelHeader}>
            {product.title}
          </Panel>
        </Col>
      </div>
    );
  }
}

export default ProductPage;
