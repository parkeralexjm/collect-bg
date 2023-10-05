// React imports
import { useState } from 'react'
// Component imports

// Bootstrap imports
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'

// Generic import
import logo from '../images/Logo-Light.png'
import { Link } from 'react-router-dom'

export default function LandingHeader() {


  return (
    <Navbar className="landing-header justify-content-between container">
      <Navbar.Brand as={Link} to={''}>
        <img className='logo' src={logo} alt="collect-dot-bg-logo" />
      </Navbar.Brand>
      <Dropdown drop='start'>
        <Dropdown.Toggle id="login">
          <i className="fa-solid fa-bars" style={{ color: '#4eaca2' }}></i>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#/login">Log In</Dropdown.Item>
          <Dropdown.Item href="#/register">Register</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Row className='align-items-center landing-header-links'>
        <Col>
          <Nav.Link href="#login">Log In</Nav.Link>
        </Col>
        <Col>
          <Button className='btn-warning' href="#register">Register</Button>
        </Col>
      </Row>
    </Navbar>
  )
}