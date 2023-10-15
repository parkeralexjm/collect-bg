// React imports
import { useState } from 'react'
// Component imports
import { loginForm, registerForm } from '../lib/forms'
// Bootstrap imports
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Row from 'react-bootstrap/Row'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
// Generic import
import logo from '../images/Logo-Light.png'
import four04 from '../images/404-light.png'
import { Link, useNavigate } from 'react-router-dom'
import LandingModal from './LandingModal'
import { tokenIsValid } from '../lib/auth'

export default function Header({ version, setIsAuth }) {
  const [show, setShow] = useState(false)
  const [formType, setFormType] = useState()
  const navigate = useNavigate()

  const handleClose = () => setShow(false)
  const handleShow = (e) => {
    if (tokenIsValid('collect-access-token')) {
      navigate('/games')
      return
    }
    if (e.target.innerText === 'Log In') {
      setFormType(loginForm)
    } else {
      setFormType(registerForm)
    }
    setShow(true)
  }

  return (
    <Navbar className="landing-header justify-content-between container">
      <Navbar.Brand as={Link} to={''}>
        {version === 'landing' ?
          <img className='logo' src={logo} alt="collect-dot-bg-logo" />
          :
          <img className='logo' src={four04} alt="collect-dot-bg-404" />
        }
      </Navbar.Brand>
      {/* Mobile display dropdown */}
      {version === 'landing' ?
        <Dropdown drop='start'>
          <Dropdown.Toggle variant='warning' id="login" className='login-dropdown'>
            <i className="fa-solid fa-bars" style={{ color: '#00263A' }}></i>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {tokenIsValid('collect-access-token') ?
              <Dropdown.Item onClick={handleShow}>Enter Collection</Dropdown.Item>
              :
              <>
                <Dropdown.Item onClick={handleShow}>Log In</Dropdown.Item>
                <Dropdown.Item onClick={handleShow}>Register</Dropdown.Item>
              </>
            }
          </Dropdown.Menu>
        </Dropdown>
        :
        <Button href='#contact-us' variant='warning' className='mobile-notfound-button'>Contact Us</Button>
      }
      {/* Desktop display links*/}
      {version === 'landing' ?
        <Row className='align-items-center landing-header-links justify-content-end flex-nowrap'>
          {tokenIsValid('collect-access-token') ?
            <Button variant='warning' onClick={handleShow}>Enter Collection</Button>
            :
            <>
              <Nav.Link onClick={handleShow}>Log In</Nav.Link>
              <Button variant='warning' onClick={handleShow}>Register</Button>
            </>
          }
        </Row>
        :
        <Button href='#contact-us' variant='warning' className='desktop-notfound-button'>Contact Us</Button>

      }
      {/* Login/Register modal */}
      <Modal show={show} onHide={handleClose} animation={true} className="login-modal">
        <LandingModal show={show} handleClose={handleClose} formType={formType} setFormType={setFormType} setIsAuth={setIsAuth} />
      </Modal>
    </Navbar>
  )
}