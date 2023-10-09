// React imports
import { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// Component imports
import GameCarousel from './Carousel'
import CategoryCards from './CategoryCards'
import GameCards from './GameCards'
import Profile from './Profile'
import Feature from './Feature'
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

export default function GamesDisplay() {
  const [allGames, setAllGames] = useState([])
  const [topGames, setTopGames] = useState([])
  const [allCategories, setAllCategories] = useState([])
  const [allMechanics, setAllMechanics] = useState([])
  const [user, setUser] = useState({})
  const [collectionUser, setCollectionUser] = useState({})
  const [messageList, setMessageList] = useState([])
  const [collectionMode, setCollectionMode] = useState(false)
  const [loadingGames, setLoadingGames] = useState(false)
  const [gamesProgress, setGamesProgress] = useState(0)
  const [allUsers, setAllUsers] = useState([])
  const [show, setShow] = useState(false)


  async function getGamesData() {
    try {
      setLoadingGames(true)
      // const { data } = await axiosAuth.get('/api/games/') // This is authorised route for testing.
      const { data } = await axios.get('/api/games/') // This is unauthorised for testing
      setAllGames(data)
    } catch (error) {
      console.log(error)
    }
  }
  async function getCategoriesData() {
    try {
      // const { data } = await axiosAuth.get('/api/games/') // This is authorised route for testing.
      const { data } = await axios.get('/api/categories/') // This is unauthorised for testing
      setAllCategories(data.sort((a, b) => a.name.localeCompare(b.name)))
    } catch (error) {
      console.log(error)
    }
  }
  async function getMechanicsData() {
    try {
      // const { data } = await axiosAuth.get('/api/games/') // This is authorised route for testing.
      const { data } = await axios.get('/api/mechanics/') // This is unauthorised for testing
      setAllMechanics(data.sort((a, b) => a.name.localeCompare(b.name)))
    } catch (error) {
      console.log(error)
    }
  }
  async function getTopGamesData() {
    try {
      // const { data } = await axiosAuth.get('/api/games/') // This is authorised route for testing.
      const { data } = await axios.get('https://boardgamegeek.com/xmlapi2/hot?type=boardgame&count=10') // This is unauthorised for testing
      const convertedData = new XMLParser().parseFromString(data)
      setTopGames(convertedData.children.slice(0, 10))
    } catch (error) {
      console.log(error)
    }
  }
  async function getUserData() {
    try {
      const { data } = await axiosAuth.get(`/api/auth/user/${userId('collect-refresh-token')}`)
      setUser(data)
    } catch (error) {
      console.log(error)
    }
  }
  async function getMessageData() {
    try {
      const { data } = await axios.get('/api/chatmessage')
      setMessageList(data)
    } catch (error) {
      console.log(error)
    }
  }
  async function getAllUserData() {
    try {
      const { data } = await axios.get('/api/auth/users')
      setAllUsers(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllUserData()
    getMessageData()
    getUserData()
    getMechanicsData()
    getCategoriesData()
    getGamesData()
    getTopGamesData()
  }, [])

  function handleCollectionDisplay() {
    setCollectionMode(!collectionMode)
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
            {topGames.map((game, index) => {
              return (
                <Fragment key={index}>
                  <div className='display-top-games'>
                    <img src={game.children[0].attributes.value} alt={game.children[1].attributes.value} />
                    <div>
                      <h3>{game.children[1].attributes.value}</h3>
                      <h4>{game.children[2].attributes.value}</h4>
                    </div>
                  </div>
                </Fragment>)
            })}
            <div className='socials'>
              <Link to='#https://twitter.com/home'><i className="fa-brands fa-xl fa-x-twitter"></i></Link>
              <Link to='#https://www.facebook.com/'><i className="fa-brands fa-xl fa-facebook-f"></i></Link>
              <Link to='#https://github.com/parkeralexjm'><i className="fa-brands fa-xl fa-github"></i></Link>
              <Link to='#https://www.linkedin.com/in/parkeralexjm/'><i className="fa-brands fa-xl fa-linkedin"></i></Link>
            </div>
          </Col>
          <Col xs={12} md={9} lg={6} xxl={7} className='center-col'>
            {
              !collectionMode ?
                <>
                  <GameCarousel gamesData={allGames.slice(0, 5)} />
                  {/* {loadingGames && <ProgressBar now={gamesProgress} />} */}
                  <GameCards games={allGames} allCategories={allCategories} allMechanics={allMechanics} />
                </>
                :
                <UserCollection user={collectionUser} games={collectionUser.collection} allCategories={allCategories} allMechanics={allMechanics} setCollectionUser={setCollectionUser} />
            }
          </Col>
          <Col xs={0} md={3} lg={3} className='right-col'>
            <Profile user={user} handleCollectionDisplay={handleCollectionDisplay} setCollectionUser={setCollectionUser} />
            <Feature />
            <ChatDisplay user={user} setCollectionUser={setCollectionUser} handleCollectionDisplay={handleCollectionDisplay} allUsers={allUsers} setUser={setUser} messageList={messageList} refresh={getMessageData} />
            <div className="me-2 mb-2" onClick={handleShow}>
              <i className="fa-regular fa-message fa-lg" style={{ color: '#ffffff' }}></i>
            </div>
            <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Modal</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ChatMobile user={user} setCollectionUser={setCollectionUser} handleCollectionDisplay={handleCollectionDisplay} allUsers={allUsers} setUser={setUser} messageList={messageList} refresh={getMessageData} />
              </Modal.Body>
            </Modal>
          </Col>
        </Row>
      </div>
    </section >
  )
}