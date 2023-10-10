import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import ChatMessage from './ChatMessage'
import { userId } from '../lib/auth'
import axiosAuth from '../lib/axios'


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
          <Button type='submit'><i className="fa-regular fa-paper-plane"></i></Button>
        </Form>

      </div>
    </div>
  )
}