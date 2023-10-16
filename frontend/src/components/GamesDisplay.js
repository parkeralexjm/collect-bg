// React imports
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// Component imports
import GameCarousel from './Carousel'
import GameCards from './GameCards'
import Profile from './Profile'
import ChatDisplay from './ChatDisplay'
import ChatMobile from './ChatMobile'
import UserCollection from './UserCollection'
// Bootstrap imports
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
// Axios imports
import axiosAuth from '../lib/axios'
import axios, { all } from 'axios'
import XMLParser from 'react-xml-parser'
// Generic Imports
import logo from '../images/Logo-Light.png'
import { userId } from '../lib/auth'
import Button from 'react-bootstrap/esm/Button'

export default function GamesDisplay() {

  const [topGames, setTopGames] = useState([])
  const [user, setUser] = useState({})
  const [collectionUser, setCollectionUser] = useState({})
  const [messageList, setMessageList] = useState([])
  const [collectionMode, setCollectionMode] = useState(false)
  const [allUsers, setAllUsers] = useState([])
  const [show, setShow] = useState(false)
  let messageRefresh


  async function getTopGamesData() {
    try {
      const { data } = await axios.get('https://boardgamegeek.com/xmlapi2/hot?type=boardgame&count=10') // This is unauthorised for testing
      const convertedData = new XMLParser().parseFromString(data)
      setTopGames(convertedData.children.slice(0, 10))
    } catch (error) {
      console.log(error)
    }
  }
  async function getUserData() {
    try {
      const { data } = await axiosAuth.get(`/api/auth/user/${userId('collect-refresh-token')}/`)
      setUser(data)
    } catch (error) {
      console.log(error)
    }
  }
  async function getMessageData() {
    try {
      const { data } = await axiosAuth.get('/api/chatmessage/')
      setMessageList(data)
    } catch (error) {
      console.log(error)
    }
  }
  async function getAllUserData() {
    try {
      const { data } = await axiosAuth.get('/api/auth/users/')
      setAllUsers(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllUserData()
    getUserData()
    getMessageData()
    getTopGamesData()
    // clearInterval(messageRefresh)
    // setInterval(() => {
    //   getMessageData()
    // }, 10000)

  }, [])

  function activateCollectionMode() {
    setCollectionMode(true)
  }
  function deactivateCollectionMode() {
    setCollectionMode(false)
  }

  function handleShow() {
    setShow(true)
  }


  return (
    <section className='display-background'>
      <div className='display container'>
        <Row className='d-flex background-row'>
          <Col xs={0} md={0} lg={3} xxl={2} className='left-col'>
            <Link to={''}>
              <img className='logo' src={logo} alt="collect-dot-bg-logo" />
            </Link>
            <div className='top-games-container'>
              <h2>Top 10 trending games</h2>
              {topGames.map((game, index) => {
                return (
                  <Link to={'https://boardgamegeek.com/boardgame/' + game.attributes.id} key={index}>
                    <div className='display-top-games'>
                      <img src={game.children[0].attributes.value} alt={game.children[1].attributes.value} />
                      <div className='top-games-information'>
                        <div>
                          <h3>{game.children[1].attributes.value}</h3>
                          <h4>{game.children[2].attributes.value}</h4>
                        </div>
                        <div>
                          <Button variant='outline-warning' size='sm' className='top-games-rank'>{game.attributes.rank}</Button>
                        </div>
                      </div>
                    </div>
                  </Link>)
              })}
            </div>
            <div className='socials'>
              <Link to='#https://twitter.com/home'><i className="fa-brands fa-xl fa-x-twitter"></i></Link>
              <Link to='#https://www.facebook.com/'><i className="fa-brands fa-xl fa-facebook-f"></i></Link>
              <Link to='#https://github.com/parkeralexjm'><i className="fa-brands fa-xl fa-github"></i></Link>
              <Link to='#https://www.linkedin.com/in/parkeralexjm/'><i className="fa-brands fa-xl fa-linkedin"></i></Link>
            </div>
          </Col>
          <Col xs={12} md={9} lg={6} xxl={7} className={!collectionMode ? 'center-col' : 'center-col-collection'}>
            {
              !collectionMode ?
                <>
                  <GameCards user={user} getUserData={getUserData} />
                </>
                :
                <UserCollection deactivateCollectionMode={deactivateCollectionMode} user={user} collectionUser={collectionUser} getUserData={getUserData} />
            }
          </Col>
          <Col xs={0} md={3} lg={3} className='right-col'>
            <Profile user={user} activateCollectionMode={activateCollectionMode} setCollectionUser={setCollectionUser} collectionMode />
            <ChatDisplay user={user} setCollectionUser={setCollectionUser} activateCollectionMode={activateCollectionMode} allUsers={allUsers} setUser={setUser} messageList={messageList} getMessageData={getMessageData} getUserData={getUserData} />
            <div className="me-2 mb-2 modal-button" onClick={handleShow}>
              <i className="fa-regular fa-message fa-xl" style={{ color: '#1b4358' }}></i>
            </div>
            <Modal className='mobile-modal' show={show} fullscreen={false} onHide={() => setShow(false)}>
              <Modal.Header closeButton>
                <Modal.Title></Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ChatMobile user={user} setCollectionUser={setCollectionUser} activateCollectionMode={activateCollectionMode} allUsers={allUsers} setUser={setUser} messageList={messageList} getMessageData={getMessageData} getUserData={getUserData} />
              </Modal.Body>
            </Modal>
          </Col>
        </Row>
      </div>
    </section >
  )
}