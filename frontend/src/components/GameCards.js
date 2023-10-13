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


export default function GameCards({ allGames, user, getUserData, games, allCategories, allMechanics, collectionMode = false }) {
  const [filter, setFilter] = useState({
    search: '',
    category: 'All',
    mechanic: 'All',
  })
  const [newSearch, setNewSearch] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [newMechanic, setNewMechanic] = useState('')
  const [filteredGames, setFilteredGames] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(12)
  const [show, setShow] = useState(false)
  const [detail, setDetail] = useState({})

  //  This function debounces the search so that the cards do not 'jump' around with user inputs
  const debounced = useDebouncedCallback((value) => {
    setNewSearch(value)
    const newFilteredState = { ...filter, search: value }
    setFilter(newFilteredState)
    const selectedPage = { selected: 0 }
    handlePageChange(selectedPage)
  }, 500)

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

  function reassignItemsPerPage() {
    if (window.innerWidth >= 1400) {
      collectionMode ? setItemsPerPage(18) : setItemsPerPage(12)
    } else if (window.innerWidth < 1400 && window.innerWidth >= 768) {
      collectionMode ? setItemsPerPage(12) : setItemsPerPage(8)
    } else if (window.innerWidth < 768 && window.innerWidth >= 567) {
      collectionMode ? setItemsPerPage(24) : setItemsPerPage(6)
    }
    startIndex = currentPage * itemsPerPage
    endIndex = startIndex + itemsPerPage
  }

  useEffect(() => {
    const regex = new RegExp(filter.search, 'i')
    const filteredArray = games.filter(game => {
      return (
        (regex.test(game.name)) &&
        (game.categories.some(category => category.name === filter.category) || filter.category === 'All') &&
        (game.mechanics.some(mechanic => mechanic.name === filter.mechanic) || filter.mechanic === 'All')
      )
    })
    setFilteredGames(filteredArray)
    setTotalPages(Math.ceil(filteredArray.length / itemsPerPage))
    reassignItemsPerPage()
    subset = filteredGames.slice(startIndex, endIndex)
  }, [filter, games, itemsPerPage, newSearch])

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
    reassignItemsPerPage()
  }

  function handleSubmit(e) {
    e.preventdefault()
  }

  const handlePageChange = (selectedPage) => {
    reassignItemsPerPage()
    setCurrentPage(selectedPage.selected)
  }

  window.onresize = debounce(resize, 200)
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

  // Pagination 
  let startIndex = currentPage * itemsPerPage
  let endIndex = startIndex + itemsPerPage
  let subset = filteredGames.slice(startIndex, endIndex)
  // const subset = filteredGames.slice(startIndex, endIndex)

  return (
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
                  const found = user.collection.some(el => el.id === game.id)
                  return (
                    <Col key={index} xs={6} sm={4} md={3} xxl={2} className='px-2 pb-4 card-col' >
                      <Card className="text-center game-card h-100" onClick={() => handleShow(game)}>
                        <div className='img-container'>
                          <Card.Img variant='top' src={game.image} />
                          {
                            found ?
                              <div className='collect' onClick={() => handleCollect(game, 'remove')}>
                                <i className="fa-solid fa-minus collect-minus" style={{ color: '#ffffff' }}></i>
                              </div>
                              :
                              <div className='collect' onClick={() => handleCollect(game, 'add')}>
                                <i className="fa-solid fa-plus collect-plus" style={{ color: '#ffffff' }}></i>
                              </div>
                          }
                        </div>
                        <Card.Body className='d-flex flex-column justify-content-center'>
                          <Card.Text>
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
              />
            </div>
            {
              detail &&
              <GameModal detail={detail} show={show} setShow={setShow} />
            }
          </>
          :
          allGames.length > 0 ?
            <h2>No Games Found</h2>
            :
            <h2>Loading...</h2>
      }

    </Container >
  )
}