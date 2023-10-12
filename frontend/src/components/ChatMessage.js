// Bootstrap imports
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export default function ChatMessage({ message }) {
  return (
    <div className="chat-message">
      <img src={message.user.image} alt="profile-picture" />
      <div>
        <h5 className="message-author">{message.user.username}</h5>
        <div>
          <h4 className='text-justify'>{message.content}</h4>

        </div>
      </div>
    </div>
  )
}