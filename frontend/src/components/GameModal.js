// Bootstrap imports
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function GameModal({ detail, show, setShow }) {
  console.log(detail)

  return (
    <Modal show={show} fullscreen={false} onHide={() => setShow(false)} className='game-modal'>
      <Modal.Header closeButton>
        <Modal.Title>{detail.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body classname='detail'>
        <Row>
          <Col classname='detail-image'>
            <img src={detail.thumbnail} />
          </Col>
          <Col className='detail-info'>
            <h4>Year: {detail.yearpublished}</h4>
            <h3>Playtime: {detail.playingtime} minutes</h3>
            <h3>Players: {detail.minplayers} - {detail.maxplayers}</h3>
            {
              detail.categories &&
              detail.categories.map(({ name }, index) => {
                return <Button variant='outline-warning' size='sm' key={index}>{name}</Button>
              })
            }
          </Col>
        </Row>
        <Row className='detail-description'>
          <p>{detail.description}</p>
        </Row>
        <Row>
          {detail.mechanics &&
            detail.mechanics.map(({ name }, index) => {
              return <Button variant='outline-danger' size='sm' key={index}>{name}</Button>
            })
          }
        </Row>
      </Modal.Body>
    </Modal>
  )
}