import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function CategoryCards({ categoriesData }) {

  return (
    <Row className='center-cards'>
      {
        categoriesData.map(({ name }, index) => {
          return (
            <Col key={index}>
              <Card className="text-center">
                <Card.Header>Featured Category</Card.Header>
                <Card.Img variant='top' src='https://www.mi-gb.com/wp-content/uploads/2012/04/CategoryManagementDiagram.png' />
                <Card.Body>
                  <Card.Text>
                    {name}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          )
        })
      }
    </Row>
  )
}