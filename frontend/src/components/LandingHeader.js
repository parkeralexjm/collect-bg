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
import Modal from 'react-bootstrap/Modal'

// Generic import
import logo from '../images/Logo-Light.png'
import { Link } from 'react-router-dom'
import LandingModal from './LandingModal'

export default function LandingHeader() {
  const [show, setShow] = useState(false)
  const [formType, setFormType] = useState('register')

  const handleClose = () => setShow(false)
  const handleShow = (e) => {
    setShow(true)
    setFormType(e.target.innerText)
  }

  return (
    <Navbar className="landing-header justify-content-between container">
      <Navbar.Brand as={Link} to={''}>
        <img className='logo' src={logo} alt="collect-dot-bg-logo" />
      </Navbar.Brand>
      {/* Mobile display dropdown */}
      <Dropdown drop='start'>
        <Dropdown.Toggle id="login">
          <i className="fa-solid fa-bars" style={{ color: '#4eaca2' }}></i>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={handleShow}>Log In</Dropdown.Item>
          <Dropdown.Item onClick={handleShow}>Register</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {/* Desktop display links*/}
      <Row className='align-items-center landing-header-links'>
        <Col>
          <Nav.Link href="#login">Log In</Nav.Link>
        </Col>
        <Col>
          <Button className='btn-warning' href="#register">Register</Button>
        </Col>
      </Row>
      {/* Login/Register modal */}
      <Modal show={show} onHide={handleClose} animation={false}>
        <LandingModal handleClose={handleClose} formType={formType} />
      </Modal>
    </Navbar>
  )
}