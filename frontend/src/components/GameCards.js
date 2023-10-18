// React imports
import { useEffect, useState } from 'react'
// Bootstrap imports
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
// Generic Imports
import ReactPaginate from 'react-paginate'
import { useDebouncedCallback } from 'use-debounce'
import GameModal from './GameModal'
import axiosAuth from '../lib/axios'
import PlaceholderCards from './PlaceholderCards'
import axios from 'axios'
import GameCarousel from './Carousel'
import Button from 'react-bootstrap/Button'

export default function GameCards({ user, getUserData, collectionMode = false, collectionUser }) {
  const [filter, setFilter] = useState({
    search: '',
    category: '',
    mechanic: '',
    collection: '',
  })
  const [allGames, setAllGames] = useState([])
  const [filteredGames, setFilteredGames] = useState([])
  const [newSearch, setNewSearch] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [newMechanic, setNewMechanic] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [show, setShow] = useState(false)
  const [detail, setDetail] = useState({})
  const [allCategories, setAllCategories] = useState([])
  const [allMechanics, setAllMechanics] = useState([])
  const [loading, setLoading] = useState(false)

  //  This function debounces the search so that the cards do not 'jump' around with user inputs
  const debounced = useDebouncedCallback((value) => {
    setNewSearch(value)
    const newFilteredState = { ...filter, search: value }
    setFilter(newFilteredState)
    const selectedPage = { selected: 0 }
    handlePageChange(selectedPage)
  }, 500)

  async function getGamesData(pagination = '') {
    setLoading(true)
    try {
      let category = ''
      let mechanic = ''
      let search = ''
      if (filter.category !== '') {
        category = `&categories=${filter.category}`
      }
      if (filter.mechanic !== '') {
        mechanic = `&mechanics=${filter.mechanic}`
      }
      if (filter.search !== '') {
        search = `&name=${filter.search}`
      }
      if (!collectionMode) {
        const { data } = await axiosAuth.get(`/api/games/?${pagination}${category}${mechanic}${search}&p=${currentPage + 1}`) // This is authorised route for testing.
        setAllGames(data.results)
        setTotalPages(Math.ceil(data.count / 8))
      } else if (collectionMode && collectionUser) {
        const collection = `&owned=${collectionUser.id}`
        const { data } = await axiosAuth.get(`/api/games/?${collection}${pagination}${category}${mechanic}${search}&p=${currentPage + 1}&page_size=12`) // This is authorised route for testing.
        setAllGames(data.results)
        setTotalPages(Math.ceil(data.count / 12))
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }
  async function getCategoriesData() {
    try {
      const { data } = await axios.get('/api/categories/') // This is unauthorised for testing
      setAllCategories(data.sort((a, b) => a.name.localeCompare(b.name)))
    } catch (error) {
      console.log(error)
    }
  }
  async function getMechanicsData() {
    try {
      const { data } = await axios.get('/api/mechanics/') // This is unauthorised for testing
      setAllMechanics(data.sort((a, b) => a.name.localeCompare(b.name)))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setFilter({ ...filter, collection: collectionUser })
    setCurrentPage(0)
  }, [collectionUser])

  useEffect(() => {
    getMechanicsData()
    getCategoriesData()
  }, [])

  function resetFilters() {
    setNewSearch('')
    setNewCategory('')
    setNewMechanic('')
    setFilter({
      search: '',
      category: '',
      mechanic: '',
      collection: '',
    })
  }

  useEffect(() => {
    setAllGames([])
    getGamesData()
  }, [filter, currentPage])


  useEffect(() => {
    setFilteredGames(allGames)
    subset = filteredGames.slice(startIndex, endIndex)
  }, [allGames])

  function handleChange(e) {
    const newFilteredState = { ...filter, [e.target.name]: e.target.value }
    setFilter(newFilteredState)
    if (e.target.name === 'search') {
      setNewSearch(e.target.value)
    } else if (e.target.name === 'category') {
      setNewCategory(e.target.value)
    } else if (e.target.name === 'mechanic') {
      setNewMechanic(e.target.value)
    }
    setCurrentPage(0)
  }

  function handleSubmit(e) {
    e.preventDefault()
  }

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected)
  }

  // window.onresize = debounce(resize, 200)
  let width = window.innerWidth
  // This function is only called using the debounce to prevent it triggering on every pixel of resizing
  function resize() {
    if (width !== window.innerWidth) {
      const selectedPage = { selected: 0 }
      handlePageChange(selectedPage)
      width = window.innerWidth
    }
  }
  // This useEffect sets the page back to 1 when changing the category or mechanic selection
  useEffect(() => {
    resize()
  }, [newCategory, newMechanic])

  function handleShow(game) {
    setDetail(game)
    setShow(true)
  }

  async function patchCollection(id, element) {
    try {
      const { data } = await axiosAuth.patch(`/api/games/${id}/owned/`)
      const gameIndex = filteredGames.findIndex((game => game.id === id))
      const games = [...filteredGames]
      const game = { ...games[gameIndex] }
      game.owned = data.owned
      games[gameIndex] = game
      setFilteredGames(games)

    } catch (error) {
      console.log(error)
    }
    element.classList.remove('loading')
  }

  function handleCollect(index, id, method) {
    const element = document.getElementById(`${index}-${method}-btn`)
    if (!element.classList.contains('loading')) {
      element.classList.add('loading')
      toggleLoading(method, index)
      patchCollection(id, element)
    }

  }
  // return the object in the request, spread filtered games and update the state


  function toggleLoading(method, index) {
    const element = document.getElementById(`${index}-${method}-btn`)
    console.log(element)
    // if (method === 'add') {
    //   element.innerHTML = 'Adding...'
    // } else {
    //   element.innerHTML = 'Removing...'
    // }
  }

  function topFunction() {
    document.body.scrollTop = 0 // For Safari
    document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
  }

  // Pagination 
  const startIndex = 0
  let endIndex
  collectionMode ? endIndex = 12 : endIndex = 8
  // const startIndex = currentPage * itemsPerPage
  // const endIndex = startIndex + itemsPerPage
  let subset = filteredGames.slice(startIndex, endIndex)
  // const subset = filteredGames.slice(startIndex, endIndex)

  return (
    <>
      {!collectionMode && <GameCarousel handleShow={handleShow} gamesData={allGames.slice(0, 5)} />}
      <Container className='center-cards'>
        <Row as={Form} onSubmit={handleSubmit} className='game-card-search'>
          <Col xs={12} md={4}>
            <Form.Label hidden label='Search game' />
            <Form.Control autoComplete='off' className='search-input' type="search" placeholder="Search games..." name="search" defaultValue={newSearch} onChange={(e) => debounced(e.target.value)} />
            <span className="focus-border"></span>
          </Col>
          <Col xs={6} md={3}>
            <Form.Label label='Category'>
              <Form.Control as='select' name="category" value={newCategory} onChange={handleChange} aria-label="Floating label select" >
                <option value=''>- Category -</option>
                {allCategories.map(({ name, id }, index) => {
                  return (<option key={index} value={id}>{name}</option>)
                })}
              </Form.Control>
              <span className="focus-border"></span>
            </Form.Label>
          </Col>
          <Col xs={6} md={3}>
            <Form.Label label='Mechanic'>
              <Form.Control as='select' name="mechanic" value={newMechanic} onChange={handleChange} aria-label="Floating label select" >
                <option value=''>- Mechanic -</option>
                {allMechanics.map(({ name, id }, index) => {
                  return (<option key={index} value={id}>{name}</option>)
                })}
              </Form.Control>
              <span className="focus-border"></span>
            </Form.Label>
          </Col>
          <Col xs={12} md={2}>
            <Button onClick={resetFilters} variant='outline-warning'>Reset</Button>
          </Col>
        </Row>
        <div className='pagination'>
          {filteredGames.map((item) => (
            <div key={item.id}>{item.title}</div>
          ))}
          <ReactPaginate className='react-paginate'
            pageCount={totalPages}
            onPageChange={handlePageChange}
            forcePage={currentPage}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
          />
        </div>
        {
          filteredGames.length > 0 ?
            <>
              <Row className={collectionMode ? 'game-card-display-collection' : 'game-card-display'} >
                {
                  filteredGames.map((game, index) => {
                    let found
                    if (game.owned.includes(user.id)) {
                      found = true
                    } else {
                      found = false
                    }

                    return (
                      <Col key={index} xs={6} md={3} className='px-2 pb-4 card-col' >
                        <Card className="text-center game-card h-100">
                          <div className='img-container' onClick={() => handleShow(game)}>
                            <Card.Img variant='top' src={game.image} />
                          </div>
                          <Card.Body className='d-flex flex-column justify-content-center'>
                            {
                              found ?
                                <div id={index + '-remove-btn'} className='collect-remove' onClick={() => {
                                  handleCollect(index, game.id, 'remove')
                                }}>
                                  Remove
                                </div>
                                :
                                <div id={index + '-add-btn'} className='collect-add' onClick={() => {
                                  handleCollect(index, game.id, 'add')
                                }
                                }>
                                  Add
                                </div>
                            }
                            <Card.Text onClick={() => handleShow(game)}>
                              {game.name}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    )
                  })
                }
              </Row>
              <div className='pagination pagination-bottom'>
                {filteredGames.map((item) => (
                  <div key={item.id}>{item.title}</div>
                ))}
                <ReactPaginate className='react-paginate'
                  pageCount={totalPages}
                  onPageChange={handlePageChange}
                  forcePage={currentPage}
                  pageRangeDisplayed={3}
                  marginPagesDisplayed={1}
                  onClick={topFunction}
                />
              </div>
              {
                detail &&
                <GameModal detail={detail} show={show} setShow={setShow} />
              }
            </>
            :
            loading ?
              <Row className={collectionMode ? 'game-card-display-collection  card-col-placeholder' : 'game-card-display card-col-placeholder'}>
                <PlaceholderCards number={collectionMode ? 12 : 8} loading={loading} />
              </Row>
              :
              filter.search === '' && filter.category === '' && filter.mechanic === '' ?
                <h2>- User has no games -</h2>
                :
                <h2>- Sorry, no matches for your query -</h2>

          // <h2>Loading...</h2>
          // Placeholder cards

        }

      </Container >
    </>
  )
}