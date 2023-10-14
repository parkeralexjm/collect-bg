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
import debounce from 'debounce'
import GameModal from './GameModal'
import axiosAuth from '../lib/axios'
import PlaceholderCards from './PlaceholderCards'
import axios from 'axios'
import GameCarousel from './Carousel'

export default function GameCards({ user, getUserData, collectionMode = false }) {
  const [filter, setFilter] = useState({
    search: '',
    category: 'All',
    mechanic: 'All',
  })
  const [allGames, setAllGames] = useState([])
  const [filteredGames, setFilteredGames] = useState([])
  const [newSearch, setNewSearch] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [newMechanic, setNewMechanic] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(8)
  const [show, setShow] = useState(false)
  const [detail, setDetail] = useState({})
  const [allCategories, setAllCategories] = useState([])
  const [allMechanics, setAllMechanics] = useState([])

  //  This function debounces the search so that the cards do not 'jump' around with user inputs
  const debounced = useDebouncedCallback((value) => {
    setNewSearch(value)
    const newFilteredState = { ...filter, search: value }
    setFilter(newFilteredState)
    const selectedPage = { selected: 0 }
    handlePageChange(selectedPage)
  }, 500)

  async function getGamesData(pagination = '') {
    try {
      const { data } = await axiosAuth.get(`/api/games/${pagination}`) // This is authorised route for testing.
      // const { data } = await axios.get('/api/games/') // This is unauthorised for testing
      console.log('games data', data)
      setAllGames(data.results)
      setTotalPages(Math.ceil(data.count / itemsPerPage))
    } catch (error) {
      console.log(error)
    }
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
    getMechanicsData()
    getCategoriesData()
    getGamesData()
  }, [])

  function resetFilters() {
    setNewSearch('')
    setNewCategory('')
    setNewMechanic('')
    setFilter({
      search: '',
      category: 'All',
      mechanic: 'All',
    })
  }


  useEffect(() => {
    const regex = new RegExp(filter.search, 'i')
    let filteredArray
    if (allGames.length > 0) {
      filteredArray = allGames.filter(game => {
        return (
          (regex.test(game.name)) &&
          (game.categories.some(category => category.name === filter.category) || filter.category === 'All') &&
          (game.mechanics.some(mechanic => mechanic.name === filter.mechanic) || filter.mechanic === 'All')
        )
      })
      setFilteredGames(filteredArray)

    }
    subset = filteredGames.slice(startIndex, endIndex)
  }, [filter, allGames, itemsPerPage, newSearch])

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
  }

  function handleSubmit(e) {
    e.preventdefault()
  }

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected)
    getGamesData(`?p=${selectedPage.selected + 1}`)
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

  function handleCollect(game, option) {
    async function patchCollection() {
      try {
        const { data } = await axiosAuth.patch(`/api/auth/${user.id}/collection/`, { id: game.id, type: option })
        // refresh here
        getUserData()
      } catch (error) {
        console.log(error)
      }
    }
    patchCollection()
  }

  function topFunction() {
    document.body.scrollTop = 0 // For Safari
    document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
  }

  // Pagination 
  const startIndex = 0
  const endIndex = 8
  // const startIndex = currentPage * itemsPerPage
  // const endIndex = startIndex + itemsPerPage
  let subset = filteredGames.slice(startIndex, endIndex)
  // const subset = filteredGames.slice(startIndex, endIndex)

  return (
    <>
      {!collectionMode && <GameCarousel gamesData={allGames.slice(0, 5)} />}
      <Container className='center-cards'>
        <Row as={Form} onSubmit={handleSubmit} className='game-card-search'>
          <Col xs={12} md={4}>
            <Form.Label hidden label='Search game' />
            <Form.Control className='search-input' type="search" placeholder="Search games..." name="search" defaultValue={newSearch} onChange={(e) => debounced(e.target.value)} />
          </Col>
          <Col xs={6} md={4}>
            <Form.Label label='Category'>
              <Form.Control as='select' name="category" value={newCategory} onChange={handleChange} aria-label="Floating label select" >
                <option value='All'>- Category -</option>
                {allCategories.map(({ name }, index) => {
                  return (<option key={index} value={name}>{name}</option>)
                })}
              </Form.Control>
            </Form.Label>
          </Col>
          <Col xs={6} md={4}>
            <Form.Label label='Mechanic'>
              <Form.Control as='select' name="mechanic" value={newMechanic} onChange={handleChange} aria-label="Floating label select" >
                <option value='All'>- Mechanic -</option>
                {allMechanics.map(({ name }, index) => {
                  return (<option key={index} value={name}>{name}</option>)
                })}
              </Form.Control>
            </Form.Label>
          </Col>
        </Row>
        {
          filteredGames.length > 0 ?
            <>
              <div className='pagination'>
                {subset.map((item) => (
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
              <Row className={collectionMode ? 'game-card-display-collection' : 'game-card-display'} >
                {
                  subset.map((game, index) => {
                    let found
                    if (user.collection) {
                      found = user.collection.some(el => el.id === game.id)
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
                                <div className='collect-remove' onClick={() => handleCollect(game, 'remove')}>
                                  Remove
                                </div>
                                :
                                <div className='collect-add' onClick={() => handleCollect(game, 'add')}>
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
                {subset.map((item) => (
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
            allGames.length > 0 ?
              <h2>- Sorry, no matches for your query -</h2>
              :
              <Row className={collectionMode ? 'game-card-display-collection  card-col-placeholder' : 'game-card-display card-col-placeholder'}>
                <PlaceholderCards number={itemsPerPage} />
              </Row>
          // <h2>Loading...</h2>
          // Placeholder cards

        }

      </Container >
    </>
  )
}