import { useState } from 'react'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import { setToken } from '../lib/auth'
import { useNavigate } from 'react-router-dom'

export default function LandingModal({ handleClose, formType }) {
  const [formData, setFormData] = useState()
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(formType.request, formData)
      setToken('collect-access-token', data.access)
      setToken('collect-refresh-token', data.refresh)
      handleClose()
      setMessage('Login Successful')
      navigate('/games')
      // console.log(data)
    } catch (error) {
      console.log(error)
      // setMessage(error.response.data.detail)
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
          <Button variant="secondary" type='submit'>
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