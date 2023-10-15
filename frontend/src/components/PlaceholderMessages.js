import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import placeholderText from '../images/placeholder-text.png'

export default function PlaceholderMessages({ number }) {
  const placeholderData = []
  for (let i = 0; i < number; i++) {
    placeholderData.push(i)
  }
  return (
    placeholderData.map((data) => {
      return (
        <div className='chat-message d-flex flex-column p-4' key={data}>
          <div className='placeholder-message-text'></div>
          <div className='placeholder-message-text'></div>
        </div>
      )
    })
  )
}