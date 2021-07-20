import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link className="nav-link" href="#change-password">Change Password</Nav.Link>
    <Nav.Link className="nav-link" href="#sign-out">Sign Out</Nav.Link>
    <Nav.Link className="nav-link" href="#squads">Your Squads</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link className="nav-link" href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link className="nav-link" href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    <Nav.Link className="nav-link" href="#/">Home</Nav.Link>
    <Nav.Link className="nav-link" href="#/pokemon">Shop</Nav.Link>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar className="navbar" sticky="top" fixed="top" expand="md">
    <Navbar.Brand href="#">
      Pokemon Trading Database
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto navs">
        { user && <span className="navbar-text mr-2">Welcome, {user.name}</span>}
        { alwaysOptions }
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
