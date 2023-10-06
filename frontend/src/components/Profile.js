import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

export default function Profile({ user }) {
  return (
    <div className="profile">
      <Row>
        <Col>
          <img className='chat-profile-image' src={user.image} alt="profile-picture" />
        </Col>
        <Col>
          <h2>{user.username}</h2>
        </Col>
      </Row>
      <Row>
        <Col >
          <Button variant='danger'>Collection</Button>
        </Col>
      </Row>
    </div>
  )
}