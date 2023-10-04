// React imports
import { useState } from 'react'
// Component imports

// Bootstrap imports
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Generic import
import logo from '../images/Logo-Light.png'

export default function LandingHeader() {
  const [show, setShow] = useState(false)

  return (
    <Navbar className="landing-header justify-content-between">
      <Navbar.Brand href="#">
        <img src={logo} alt="collect-dot-bg-logo" />
      </Navbar.Brand>
      <Navbar.Toggle className='navbar-toggler-icon' />
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="login">
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#/login">Log In</Dropdown.Item>
          <Dropdown.Item href="#/register">Register</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Row>
        <Col>
          <FontAwesomeIcon icon="fa-solid fa-bars" style={{ color: '#0f756b' }} />
          <Nav.Link href="#login">Log In</Nav.Link>
        </Col>
        <Col>
          <Nav.Link href="#register">Register</Nav.Link>
        </Col>
      </Row>
    </Navbar>
  )
}