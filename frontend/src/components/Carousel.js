// Bootstrap imports
import Carousel from 'react-bootstrap/Carousel'
import Image from 'react-bootstrap/Image'

export default function GameCarousel({ gamesData }) {
  return (
    <Carousel style={{ position: 'relative' }} fade={true}>
      {
        gamesData.map((game, index) => {
          return (
            <Carousel.Item key={index}>
              <Image src={game.image} text={game.name} />
              <Carousel.Caption>
                {/* <h3>{game.name}</h3> */}
              </Carousel.Caption>
            </Carousel.Item>
          )
        })
      }
    </Carousel>
  )
}