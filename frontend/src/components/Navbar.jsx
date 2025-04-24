import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const AppNavbar = () => (
  <Navbar bg="dark" variant="dark" expand="lg">
    <Container>
      <Navbar.Brand href="/">FruitBox Admin</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
          <NavLink className="nav-link" to="/orders">Orders</NavLink>
          <NavLink className="nav-link" to="/menu">Menu & Pricing</NavLink>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default AppNavbar;