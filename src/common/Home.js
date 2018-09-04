import React , {Component} from 'react';

import { Jumbotron, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
        <Jumbotron>
          <h1>RefurbIT Integration System</h1>
          <p>
            MarketPlace Integration for  <strong>RefurbIT.com</strong>.
            <br />
            <br />
            <br />
            <Link to="/login">
              <Button
                bsSize="large"
                bsStyle="primary">
                Head to the Store
              </Button>
            </Link>
          </p>
        </Jumbotron>
      </div>
    );
  }
}

export default Home;