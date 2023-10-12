// React imports
import { useState } from 'react'
// Bootstrap imports
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'
// Axios imports
import axios from 'axios'
// Generic Imports
import { setToken } from '../lib/auth'
import { loginForm } from '../lib/forms'

export default function LandingModal({ handleClose, formType, setFormType, setIsAuth }) {
  const [formData, setFormData] = useState()
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (formType.request === '/api/auth/login/') {
        const { data } = await axios.post(formType.request, formData)
        setToken('collect-access-token', data.access)
        setToken('collect-refresh-token', data.refresh)
        handleClose()
        setMessage('Login successful')
        navigate('/games')
      } else {
        const { data } = await axios.post(formType.request, formData)
        setFormType(loginForm)
        setMessage('Registration successful please log in')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setMessage('')
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{formType.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            formType.form.map(({ type, name }, i) => {
              return (
                <Form.Group key={i} controlId={name.toLowerCase().replace(' ', '_')}>
                  <Form.Label>{name}</Form.Label>
                  <Form.Control name={name.toLowerCase().replace(' ', '_')} type={type} onChange={handleChange} autoComplete={name === 'Password' ? 'current-password' : 'new-password'} />
                </Form.Group>
              )
            })
          }
          <h3>
            {message && message}
          </h3>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" type='submit'>
            {formType.title}
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Form>
    </>
  )
}