import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'


export default function ChatMessage({ message }) {
  return (
    <div className="chat-message">
      <Row>
        <Col xs={2}>
          <img src={message.user.image} alt="profile-picture" />
        </Col>
        <Col xs={10}>
          <h5>{message.user.username}</h5>
          <p className='text-justify'>{message.content}</p>
        </Col>
      </Row>
    </div>
  )
}