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
  const [validated, setValidated] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }
    setValidated(true)

    e.preventDefault()
    try {
      const { data } = await axios.post(formType.request, formData)
      setToken('collect-access-token', data.access)
      setToken('collect-refresh-token', data.refresh)
      handleClose()
      setMessage('Login successful')
      navigate('/games')
    } catch (error) {
      if (error.response.data.detail) {
        setMessage(error.response.data.detail)
      } else if (error.response.status === 422) {
        setMessage(error.response.data.non_field_errors)
      }
      console.log(error)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setMessage('')
  }

  const resetInput = (e) => {
    e.target.value = ''
  }

  return (
    <>
      <Form onSubmit={handleSubmit} noValidate validated={validated}>
        <Modal.Header closeVariant='white' closeButton>
          <Modal.Title>{formType.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            formType.form.map(({ type, name }, i) => {
              return (
                <Form.Group key={i} controlId={name.toLowerCase().replace(' ', '_')}>
                  <Form.Label>{name}</Form.Label>
                  <Form.Control onFocus={resetInput} name={name.toLowerCase().replace(' ', '_')} type={type} onChange={handleChange} autoComplete={name === 'Password' ? 'current-password' : 'new-password'} required />
                  <Form.Control.Feedback type="invalid">Please provide a valid {name.toLowerCase().replace(' ', '_')}</Form.Control.Feedback>
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