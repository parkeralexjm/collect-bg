import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useDebouncedCallback } from 'use-debounce'
import debounce from 'debounce'

export default function GameCards({ games, allCategories, allMechanics, collectionMode = false }) {
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

  //  This function debounces the search so that the cards do not 'jump' around with user inputs
  const debounced = useDebouncedCallback((value) => {
    setNewSearch(value)
    const newFilteredState = { ...filter, search: value }
    setFilter(newFilteredState)
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
  function resize() {
    // This function is only called using the debounce to prevent it triggering on every pixel of resizing
    const selectedPage = { selected: 0 }
    handlePageChange(selectedPage)
  }
  // This useEffect sets the page back to 1 when changing the category or mechanic selection
  useEffect(() => {
    resize()
  }, [newCategory, newMechanic])

  // Pagination 
  let startIndex = currentPage * itemsPerPage
  let endIndex = startIndex + itemsPerPage
  let subset = filteredGames.slice(startIndex, endIndex)
  // const subset = filteredGames.slice(startIndex, endIndex)

  return (
    <Container className='center-cards'>
      <Row as={Form} onSubmit={handleSubmit} className='game-card-search'>
        <Col>
          <FloatingLabel label='Search game'>
            <Form.Control className="form-control" size="sm" type="search" placeholder="Search games..." name="search" defaultValue={newSearch} onChange={(e) => debounced(e.target.value)} />
          </FloatingLabel>
        </Col>
        <Col>
          <FloatingLabel label='Category'>
            <Form.Control as='select' size="sm" className="form-control" name="category" value={newCategory} onChange={handleChange} aria-label="Floating label select" >
              <option value='All'>- Category -</option>
              {allCategories.map(({ name }, index) => {
                return (<option key={index} value={name}>{name}</option>)
              })}
            </Form.Control>
          </FloatingLabel>
        </Col>
        <Col>
          <FloatingLabel label='Mechanic'>
            <Form.Control as='select' size="sm" className="form-control" name="mechanic" value={newMechanic} onChange={handleChange} aria-label="Floating label select" >
              <option value='All'>- Mechanic -</option>
              {allMechanics.map(({ name }, index) => {
                return (<option key={index} value={name}>{name}</option>)
              })}
            </Form.Control>
          </FloatingLabel>
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
                pageRangeDisplayed={1}
              />
            </div>
            <Row className='game-card-display'>
              {subset.map(({ name, image }, index) => {
                return (
                  <Col key={index} xs={6} sm={4} md={3} xxl={2} className='px-2 pb-4' >
                    <Card className="text-center game-card h-100">
                      <div className='img-container'>
                        <Card.Img variant='top' src={image} />
                      </div>
                      <Card.Body className='d-flex flex-column justify-content-center'>
                        <Card.Text>
                          {name}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                )
              })}
            </Row>
          </>
          :
          <h2>Loading...</h2>
      }
    </Container>
  )
}