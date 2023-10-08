// React imports

// Component imports
import Header from './Header'
import { Link } from 'react-router-dom'
// Bootstrap imports

export default function NotFound() {
  return (
    <section className='landing'>
      <Header version={'notFound'} />
      <section className="container not-found">
        <div>
          <h1>Something&apos;s<br />missing.</h1>
          <Link to={'/'}>Go Back</Link>
        </div>
      </section>

    </section >
  )
}