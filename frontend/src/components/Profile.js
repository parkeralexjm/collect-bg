// React imports
import { useNavigate } from 'react-router-dom'
// Bootstrap imports
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'


export default function Profile({ user, activateCollectionMode, setCollectionUser, collectionMode }) {
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.clear()
    navigate('/')
  }

  return (
    <div className="profile">
      <Dropdown className='profile-ellipsis'>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          <i className="fa-solid fa-ellipsis" style={{ color: '#ffffff' }}></i>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={handleLogout}>Log Out</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Row>
        <Col xs={3}>
          <img className='chat-profile-image' src={user.image} alt="profile-picture" />
        </Col>
        <Col xs={9}>
          <h2>{user.username}</h2>
          <h4>{user.first_name} {user.last_name}</h4>
        </Col>

      </Row>
      <Row>
        <Col>
          <Button variant='danger' onClick={() => {
            setCollectionUser(user)
            activateCollectionMode()
          }}>Collection</Button>
        </Col>
      </Row>
    </div >
  )
}