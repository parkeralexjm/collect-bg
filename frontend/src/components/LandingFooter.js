// React imports
import { Link } from 'react-router-dom'
// Component imports

// Bootstrap imports
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// Generic import
import logo from '../images/Logo-Light.png'

export default function LandingFooter() {

  return (
    <footer>
      <div className='container landing-footer'>
        <div className='landing-footer-inner'>
          <Row>
            <Col>
              <Link to={''}>
                <img className='logo' src={logo} alt="collect-dot-bg-logo" />
              </Link>

              <h5>Copyright &copy; 2023</h5>
            </Col>
            <Col>
            </Col>
          </Row>
          <Row className='justify-content-end'>
            <div className='socials'>
              <i className="fa-brands fa-xl fa-x-twitter"></i>
              <i className="fa-brands fa-xl fa-facebook-f"></i>
              <i className="fa-brands fa-xl fa-github"></i>
              <i className="fa-brands fa-xl fa-linkedin"></i>
            </div>
          </Row>
        </div>
      </div>
    </footer>
  )
}