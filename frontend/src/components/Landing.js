// React imports

// Component imports
import LandingFooter from './LandingFooter'
import Header from './Header'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import Container from 'react-bootstrap/Container'
// Bootstrap imports

export default function Landing() {
  return (
    <section className='landing landing-container'>
      <Header version='landing' />
      <section className="container landing-info">
        <h1 className='hero'>Unlock the potential of your collection</h1>
        <Container className='landing-decoration'>

          <Row>
            <Col xs={3}>
            </Col>
            <Col xs={9}>
              <div className='info-box-1'>
                <div className='landing-info-box'>
                  <div className='info-box-collection'></div>
                  <h3>This is where some information about the website features will go into so that it looks fancy</h3>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={9}>
              <div className='info-box-2'>
                <div className='landing-info-box'>
                  <h3>This is where some information about the website features will go into so that it looks fancy</h3>
                  <div className='info-box-chat'></div>
                </div>
              </div>
            </Col>
            <Col xs={3}>
            </Col>
          </Row>
          <Row>
            <Col xs={3}>
            </Col>
            <Col xs={9}>
              <div className='info-box-3'>
                <div className='landing-info-box'>
                  <div className='info-box-trophy'></div>
                  <h3>This is where some information about the website features will go into so that it looks fancy</h3>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <LandingFooter />
    </section>
  )
}