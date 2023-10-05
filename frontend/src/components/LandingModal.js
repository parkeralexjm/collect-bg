import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export default function LandingModal({ handleClose, formType }) {


  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{formType}</Modal.Title>
      </Modal.Header>
      <Modal.Body>This is where the form will go</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Submit
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </>
  )
}