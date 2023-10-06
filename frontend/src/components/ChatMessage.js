import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'


export default function ChatMessage({ info }) {
  return (
    <div className="chat-message">
      <Row>
        <Col xs={2}>
          <img src={info.user.image} alt="profile-picture" />
        </Col>
        <Col xs={10}>
          <h5>{info.user.username}</h5>
          <p>{info.content}</p>
        </Col>
      </Row>
    </div>
  )
}