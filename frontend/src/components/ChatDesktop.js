import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import ChatMessage from './ChatMessage'
import { userId } from '../lib/auth'


export default function ChatDesktop({ messageList }) {
  const [message, setMessage] = useState({
    content: '',
    user: `${userId('collect-refresh-token')}`,
  })

  function handleSubmit(e) {
    e.preventDefault()
    // do axiosAuth
  }

  function handleChange(e) {
    setMessage({ ...message, [e.target.name]: e.target.value })
  }

  return (
    <div className='chat-desktop'>
      <div className='chat-information'>
        <div className='chat'>
          {
            messageList.length > 0 ?
              messageList.map((info, index) => {
                return (
                  <ChatMessage key={index} info={info} />
                )
              })
              :
              <h3>Loading...</h3>
          }
        </div>
      </div>
      <div className="chat-form">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="message-context">
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" rows={3} name='content' value={message.content} onChange={handleChange} />
          </Form.Group>
          <Button ><i className="fa-regular fa-paper-plane"></i></Button>
        </Form>

      </div>
    </div>
  )
}