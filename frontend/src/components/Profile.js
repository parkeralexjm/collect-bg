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
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          <i className="fa-solid fa-ellipsis" style={{ color: '#ffffff' }}></i>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={handleLogout}>Log Out</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <div className='profile-info'>
        <h5>Welcome back!</h5>
        <h4>{user.username ? user.username : 'Loading...'}</h4>
      </div>
      <Button className='collection-button' variant='warning' onClick={() => {
        activateCollectionMode()
        setCollectionUser(user)
      }}>My Collection</Button>
    </div >
  )
}