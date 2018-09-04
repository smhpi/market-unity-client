import React from 'react';

import { Navbar, Nav, NavItem, Glyphicon, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { IndexLinkContainer } from 'react-router-bootstrap';


class Header extends React.Component {
    constructor(props){
        super(props);
      
    }
  render() {
        const { isAuthenticated } = this.props;
        let logo = {fontWeight : "700", fontSize: 40}
        let styles ={color:"red"};
        let btn={marginTop: 7};
        return (
        <Navbar fixedTop>
            <Navbar.Header>
            <Navbar.Brand>
                <a href="/">
                    Market unity
                </a>
            </Navbar.Brand>
            <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                    <Nav>
                    <IndexLinkContainer to="/">
                    <NavItem
                        eventKey={1}>
                        Home
                    </NavItem>
                    </IndexLinkContainer>

                    <IndexLinkContainer  to="/listing">
                    <NavItem
                        eventKey={2}>
                        Listing
                    </NavItem>
                    </IndexLinkContainer>
                    <IndexLinkContainer  to="/report">
                    <NavItem
                    eventKey={2}>
                    Report
                    </NavItem>
                    </IndexLinkContainer>
                    </Nav>
                    <Nav pullRight>
                    {
                        isAuthenticated ?(
                            <ul className="nav navbar-nav navbar-right">
                                <li>
                                    <p className="navbar-text">{isAuthenticated.user.email}!</p>
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
                    <NavItem
                    eventKey={3}>
                    <Glyphicon glyph="shopping-cart" />
                    {' Cart'}
                    </NavItem>
                    </Nav>
            </Navbar.Collapse>
        </Navbar>
        );
  }
}


export default Header;