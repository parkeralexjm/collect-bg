// Bootstrap imports
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export default function ChatMessage({ message }) {
  return (
    <div className="chat-message">
      <img src={message.user.image} alt="profile-picture" />
      <div>
        <h5>{message.user.username}</h5>
        <p className='text-justify'>{message.content}</p>
      </div>
    </div>
  )
}