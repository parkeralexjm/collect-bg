// React imports
import { useState } from 'react'
// Bootstrap imports
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// Component imports
import ChatMessage from './ChatMessage'
// Axios imports
import axiosAuth from '../lib/axios'
// Generic Imports
import { userId } from '../lib/auth'
import PlaceholderMessages from './PlaceholderMessages'

export default function ChatDesktop({ messageList, getMessageData }) {
  const [message, setMessage] = useState({
    content: '',
    user: `${userId('collect-refresh-token')}`,
  })

  function handleSubmit(e) {
    e.preventDefault()
    async function postMessage() {
      try {
        const { data } = await axiosAuth.post('api/chatmessage/post/', message)
        getMessageData()
      } catch (error) {
        console.log(error)
      }
      setMessage({ ...message, content: '' })
    }
    postMessage()
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
              messageList.sort((a, b) => new Date(b.posted) - new Date(a.posted)).map((message, index) => {
                return (
                  <ChatMessage key={index} message={message} />
                )
              })
              :
              <PlaceholderMessages number={10} />
            // <h3>Loading...</h3>
          }
        </div>
      </div>
      <div className="chat-form">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="message-context">
            <Form.Control as="textarea" rows={4} name='content' value={message.content} onChange={handleChange} placeholder="Type your message..." />
          </Form.Group>
          <Button variant='' type='submit'><i className="fa-regular fa-paper-plane" style={{ color: '#fff' }}></i></Button>
        </Form>

      </div>
    </div>
  )
}