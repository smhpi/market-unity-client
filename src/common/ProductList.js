import React , {Component} from 'react';
import PropTypes from 'prop-types';
import Product from './product';
import Pagination from 'react-js-pagination';
import { Col, Clearfix } from 'react-bootstrap';


const PAGE_SIZE = 20;

class ProductList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      page: 1
    };

    this.handleSelectPage = this.handleSelectPage.bind(this);
  }

  handleSelectPage(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({page: pageNumber});
  }

  render() {
    const { page } = this.state;
    const products = this.props.products.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (
        <div>
        <Col
            className='text-right'
            xs={12}>
            <Pagination
                activePage={this.state.page}
                itemsCountPerPage={20}
                totalItemsCount={(this.props.products.length)}
                pageRangeDisplayed={Math.ceil(this.props.products.length / PAGE_SIZE)}
                onChange={this.handleSelectPage} />
        </Col>
        <Clearfix />
        {
          products.map(product => (
            <Product
              key={product.id}
              product={product} />
          ))
        }
        <Col
            className='text-center'
            xs={12}>
            <Pagination
                activePage={this.state.page}
                itemsCountPerPage={20}
                totalItemsCount={(this.props.products.length)}
                pageRangeDisplayed={Math.ceil(this.props.products.length / PAGE_SIZE)}
                onChange={this.handleSelectPage} />
        </Col>
      </div>
    );
  }
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired
};

ProductList.defaultProps = {
  products: []
};

export default ProductList;
