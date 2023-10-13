// Component imports
import LandingFooter from './LandingFooter'
import Header from './Header'
// Bootstrap imports
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import Container from 'react-bootstrap/Container'
import folder from '../images/new-folder-dynamic-color.png'
import trophy from '../images/trophy-dynamic-color.png'
import chat from '../images/chat-bubble-dynamic-color.png'

export default function Landing() {
  return (
    <section className='landing landing-container'>
      <Header version='landing' />
      <section className="container landing-info">
        <h1 className='hero'>Unlock the potential of your board game collection</h1>
        <Container>
          {/* <div className='landing-decoration'>
          </div> */}
          <Row className='landing-info-row'>
            <Col xs={2} md={2}>
            </Col>
            <Col xs={10} md={10} className='d-flex justify-content-center'>
              <div className='info-box-1'>
                <div className='landing-info-box'>
                  <img src={folder} className='info-box-image'></img>
                  <h3>Store and display your collection for others to follow</h3>
                </div>
              </div>
            </Col>
          </Row>
          <Row className='landing-info-row'>
            <Col xs={10} md={10} className='d-flex justify-content-center'>
              <div className='info-box-2'>
                <div className='landing-info-box'>
                  <h3>Follow and chat with other board game collectors</h3>
                  <img src={chat} className='info-box-image'></img>
                </div>
              </div>
            </Col>
            <Col xs={2} md={2}>
            </Col>
          </Row>
          <Row className='landing-info-row'>
            <Col xs={2} md={2}>
            </Col>
            <Col xs={10} md={10} className='d-flex justify-content-center'>
              <div className='info-box-3'>
                <div className='landing-info-box'>
                  <img src={trophy} className='info-box-image'></img>
                  <h3>Check out the hottest new games right now</h3>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <LandingFooter />
    </section >
  )
}