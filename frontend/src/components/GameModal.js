// Bootstrap imports
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function GameModal({ detail, show, setShow }) {

  return (
    <Modal show={show} fullscreen={false} onHide={() => setShow(false)} className='game-modal'>
      <Modal.Header closeButton>
        <Modal.Title>{detail.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body className='detail'>
        <Row>
          <Col xs={5} className='detail-image'>
            <img src={detail.thumbnail} />
          </Col>
          <Col xs={7} className='detail-info'>
            <h4>{detail.yearpublished}</h4>
            <h5>Playtime: {detail.playingtime} minutes</h5>
            <h5>Players: {detail.minplayers} - {detail.maxplayers}</h5>
            {
              detail.categories &&
              detail.categories.map(({ name }, index) => {
                return <Button variant='outline-warning' size='sm' className='detail-category' key={index}>{name}</Button>
              })
            }
          </Col>
        </Row>
        <Row className='detail-description'>
          <p>{detail.description}</p>
        </Row>
        <Row>
          <div>

            {detail.mechanics &&
              detail.mechanics.map(({ name }, index) => {
                return <Button variant='outline-danger' size='sm' className='detail-mechanic' key={index}>{name}</Button>
              })
            }
          </div>
        </Row>
      </Modal.Body>
    </Modal>
  )
}