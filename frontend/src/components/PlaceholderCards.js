import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import placeholderImage from '../images/placeholder-game-image.png'
import placeholderText from '../images/placeholder-text.png'

export default function PlaceholderCards({ number }) {
  const placeholderData = []
  for (let i = 0; i < number; i++) {
    placeholderData.push(i)
  }
  return (
    placeholderData.map((data) => {
      return (
        <Col key={data} xs={6} md={3} className='px-2 pb-4 card-col' >
          <Card className="text-center game-card h-100">
            <div className='img-container'>
              <Card.Img variant='top' src={placeholderImage} className='placeholder-div fadingEffect' />
            </div>
            <Card.Body className='d-flex flex-column justify-content-center placeholder-card-body'>
              <div className='collect-remove' >
              </div>
              <Card.Text>
                <img src={placeholderText} className='placeholder-div-text fadingEffect mb-2'></img>
                <img src={placeholderText} className='placeholder-div-text fadingEffect'></img>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      )
    })
  )
}